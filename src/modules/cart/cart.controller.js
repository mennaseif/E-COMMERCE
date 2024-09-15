
import { Cart} from "../../../database/models/cart.model.js"
import { Coupon } from "../../../database/models/coupon.model.js";
import { Product } from "../../../database/models/product.model.js"
import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"

////////////////////////////////error///////////////

function calcTotalPrice(isCartExist) {
    isCartExist.cartItems.forEach(item => {
        item.quantity = item.quantity || 1;
        item.price = item.price || 0;       
    });

    isCartExist.totalCartPrice = isCartExist.cartItems.reduce((prev, item) => {
        return prev + (item.quantity * item.price);
    }, 0)

    if (isCartExist.discount){
        isCartExist.totalCartPriceAfterDiscount = 
        isCartExist.totalCartPrice - (isCartExist.totalCartPrice*isCartExist.discount)/100
    }
}

const addToCart = catchError(async (req, res, next) => {
    let isCartExist = await Cart.findOne({ user: req.user._id });

    let product = await Product.findById(req.body.product);
    if (!product) return next(new AppError('Product is not found', 404));

    req.body.price = product.price;

    if (req.body.quantity > product.stock) return next(new AppError("Sold Out", 404));

    if (!isCartExist) {
        let cart = new Cart({
            user: req.user._id,
            cartItems: [req.body] 
        });

        calcTotalPrice(cart); 
        await cart.save(); 
        return res.status(200).json({ message: "Success", cart });
    } else {
        
        let item = isCartExist.cartItems.find(item => item.product == req.body.product);

    
        if (item) {
            item.quantity += req.body.quantity || 1;
            
            
            if (item.quantity > product.stock) return next(new AppError("Sold Out", 404));
        } else {

            isCartExist.cartItems.push(req.body);
        }

        calcTotalPrice(isCartExist);

        await isCartExist.save();
        return res.json({ message: "Success", cart: isCartExist });
    }
})

const updateQuantity = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id})

    let item = cart.cartItems.find(item => item.product == req.params.id)
    if (!item) return next (new AppError("product is not found",404 ))
        item.quantity = req.body.quantity
        calcTotalPrice(cart)
        await cart.save()

        res.status(200).json({message:"success", cart})
 
})

const removeItemFromCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndUpdate({user:req.user._id},
        {$pull: {cart:{_id: req.params.id}}} , {new:true})
        calcTotalPrice(cart)
        await cart.save()

    cart || next (new AppError ("Cart is not found", 404))
    !cart || res.status(200).json({message:"Success", cart})
})

const getLoggedUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({user:req.user._id})
    res.status(200).json({message:"Success", cart})
})

const clearUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndDelete({user:req.user._id})
    res.status(200).json({message:"Success", cart})
})

const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findOne({ code:req.body.code, expires:{$gte: Date.now() }})
    if(!coupon) return next (new AppError("Opps, coupon is invalid",404))
        let cart = await Cart.findOne ({ user: req.user._id })
    cart.discount = coupon.discount
    await cart.save()
    res.status(200).json({message:"Success", cart})
})





export {
    addToCart,
    updateQuantity,
    removeItemFromCart,
    getLoggedUserCart,
    clearUserCart,
    applyCoupon
}