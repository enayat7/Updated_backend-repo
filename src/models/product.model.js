import mongoose, { Schema } from "mongoose"

const productSchema =new Schema({
    title: {
        type: String,
        required: true,
        maxlenght:100,
    },
    price : {
        type:Number,
        require: true,
        default:0
    },
    thumbnail: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'
    },
    description: {
        type : String,
        require:true
    },
    discountPercentage : {
        type : String,
        require:true
    }
    

},{ timestamps : true });


export const Product = mongoose.model("Product", productSchema)