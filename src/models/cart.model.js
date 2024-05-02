import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [{
        _id: false,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        title: String, // Mover al interior del objeto 'product'
        quantity: {
            type: Number,
            required: true
        }
    }],
    default: []
});

cartSchema.pre("findOne", function(){
    this.populate("products.product");
})

mongoose.set('strictQuery', false);
const cartModel = mongoose.model('carts', cartSchema);

export default cartModel;
