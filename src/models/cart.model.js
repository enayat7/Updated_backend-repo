import mongoose, { Schema } from "mongoose"

const cartSchema =new Schema({
    name: {
        type: String,
        required: true,
        maxlenght:100,
    },
    price : {
        type:Number,
        require: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    quantity: {
        type : Number,
        default:1,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      },

},{ timestamps : true });


export const Cart = mongoose.model("Cart", cartSchema)