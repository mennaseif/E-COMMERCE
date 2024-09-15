
import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../../utils/api.features.js"
import { Coupon } from "../../../database/models/coupon.model.js"


const addCoupon= catchError(async (req, res, next) => {
    let isExist = await Coupon.findOne({ code:req.body.code})
    if (isExist) return next (new AppError("coupon is already exist",409))
      let coupon= new Coupon(req.body)
      await coupon.save()
      res.status(201).json({message:"Success", coupon})
     }
)

const getCoupons = catchError(async (req, res, next) =>{
    let coupons = await Coupon.find()
        res.status(200).json({message:"Success", coupons})
    }
)

const getCoupon= catchError(async (req, res, next) => {
    let coupon= await Coupon.findById(req.params.id)
    coupon|| next (new AppError ("Coupon not found", 404))
    !coupon|| res.status(200).json({message:"Success", coupon})
})

const updateCoupon= catchError(async (req, res, next) => {
    let coupon= await Coupon.findByIdAndUpdate(req.params.id, req.body , {new:true})
    coupon|| next (new AppError ("Coupon not found", 404))
    !coupon|| res.status(200).json({message:"Success", coupon})
})

const deleteCoupon= deleteOne(Coupon)


export {
    addCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}