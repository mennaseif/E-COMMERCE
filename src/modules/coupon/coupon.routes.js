import { Router } from "express";
import { addCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const couponRoutes = Router()
couponRoutes.use(protectedRoutes, allowedTo('admin'))
couponRoutes.route('/')
.post(addCoupon)
.get(getCoupons)
couponRoutes.route('/:id')
.get(getCoupon)
.put(updateCoupon)
.delete(deleteCoupon)

export default couponRoutes