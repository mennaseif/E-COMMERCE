import mongoose, { Types } from "mongoose";


const schema = new mongoose.Schema({
    user:{ type:Types.ObjectId , ref: "user"},
    cartItems: [
        {
            product:{ type:Types.ObjectId , ref: "user"},
            qunatity: {type :Number, default:1},
            price: Number
        }
    ],
    totalCartPrice: Number,
    discount: Number,
    totalCartPriceAfterDiscount: Number
},{timestamps:true, versionKey:false})


export const Cart = mongoose.model ('Cart', schema)