import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_SECRET);

export const createSession = async (req, res) => {
    const { items } = req.body;

    const lineItems = items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                description: item.description
            },
            unit_amount: item.price * 100 // Stripe expects the amount in cents
        },
        quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:8080/payments/success',
        cancel_url: 'http://localhost:8080/payments/cancel'
    });

    res.json({ id: session.id });
};

export const success = (req, res) => {
    res.render('paymentSuccess');
};

export const cancel = (req, res) => {
    res.render('paymentCancel');
};
