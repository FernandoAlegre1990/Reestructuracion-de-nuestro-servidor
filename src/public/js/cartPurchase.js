document.getElementById('purchaseBtn').addEventListener('click', async () => {
    try {
        const cartId = document.getElementById('purchaseBtn').getAttribute('data-cart-id');
        
        const response = await fetch(`/api/carts/${cartId}`);
        const cartData = await response.json();

        const items = cartData.products.map(product => ({
            name: product.product.title,  // Asegúrate de que este campo exista en tus datos
            description: product.product.description,  // Asegúrate de que este campo exista en tus datos
            price: product.product.price,  // Asegúrate de que este campo exista en tus datos
            quantity: product.quantity  // Asegúrate de que este campo exista en tus datos
        }));

        const sessionResponse = await fetch('/payments/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items })
        });

        const sessionData = await sessionResponse.json();

        if (sessionResponse.ok) {
            const stripe = Stripe('pk_test_51PX2ZiGgMZb7GRHpNkmUqfHn0O0XwxNvhmFPVQvAeqY3k3mDWhcA6v7X5vdqK0xhQB03p6AJgnwhn9CcOjxFgOjk00oRDCLCgM');
            await stripe.redirectToCheckout({ sessionId: sessionData.id });
        } else {
            console.error('Error creating checkout session:', sessionData.error);
            alert('Error creating checkout session');
        }
    } catch (error) {
        console.error('Error during purchase process:', error);
        alert('Error during purchase process');
    }
});
