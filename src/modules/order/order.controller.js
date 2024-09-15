
import { Cart} from "../../../database/models/cart.model.js"
import { Order } from "../../../database/models/order.model.js"
import { Product } from "../../../database/models/product.model.js"
import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);



const createCashOrder = catchError(async (req, res, next) => {
    //1.get user card by cartId
    let cart = await Cart.findById( req.params.id )
    if(!cart) return next (new AppError ("cart is not found",404))
     //2.total card price
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice   
    //3.create order
    let order = new Order({
        user: req.user._id,
        orderItems: cart.orderItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()

    //4.increment sold & decrement stock
    let options = cart.cartItems.map((prod) => {
        return (
            {
                updateOne: {
                    "filter" : {_id:prod.product},
                    "update" : {$inc: {sold:prod.qunatity, stock:-prod.qunatity}}
                }
            }
        ) 
    })

    await Product.bulkWrite(options)
    //5.clear user cart
    await Cart.findByIdAndDelete(cart._id)


    res.status(200).json({message:"success",order})

   
})

//users//id//orders
const getUserOrders = catchError(async (req, res, next) => {
  let orders = await Order.findOne({ user:req.user._id }).populate('orderItems.product')
    res.status(200).json({message:"success",orders })
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice   
})

const getAllOrders = catchError(async (req, res, next) => {
    let orders = await Order.find()
      res.status(200).json({message:"success",orders })
  })

const createCheckOutSession = catchError(async (req, res, next) => {
    let cart = await Cart.findById( req.params.id )
    if(!cart) return next (new AppError ("cart is not found",404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice  

    let session = stripe.checkout.sessions.create({
        line_items: [
            {
                price_data:{
                    currency:'egy',
                    unit_amount: totalOrderPrice *100,
                    product_data:{
                        name: req.user.name
                    }
                },
                quantity:1,
            },
        ],
        mode: 'payment',
        success_url:'htttps://hambozoo.netlify.app/#/orders',
        cancel_url:'htttps://hambozoo.netlify.app/#/cart',
        customer_email: req.user.email,
        client_reference_id: req.params.cartId,
        metadata: req.body.shippingAddress
    })

    res.json({message:"success", session})

  })


export {
    createCashOrder,
    getUserOrders,
    getAllOrders,
    createCheckOutSession
}