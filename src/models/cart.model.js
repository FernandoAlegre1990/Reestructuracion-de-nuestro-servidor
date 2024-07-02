import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        title: String,
        quantity: {
            type: Number,
            required: true
        }
    }]
});

// Utilizar populate en findById
cartSchema.statics.findByIdWithPopulate = function(id) {
    return this.findById(id)
        .populate('products.product')
        .exec();
};

const cartModel = mongoose.model('carts', cartSchema);

export default cartModel;
