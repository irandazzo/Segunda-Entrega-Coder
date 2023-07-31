import mongoose from "mongoose";

const collectionName = 'carts'

const cartSchema = mongoose.Schema({
    products: {
        type: Array,
        default: [
            {
                quantity: {
                    type: Number,
                    require: true,
                    default: 1
                }
            }
        ]
    }
});

const cartModel = mongoose.model(collectionName, cartSchema);

export default cartModel;