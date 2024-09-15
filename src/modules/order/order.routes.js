import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckOutSession, getAllOrders, getUserOrders } from "./order.controller.js";



const orderRouter = Router()
orderRouter.route('/')
.get(protectedRoutes, allowedTo('user'), getAllOrders)
orderRouter.get('/users',protectedRoutes, allowedTo('user', 'admin'), getUserOrders)

orderRouter.route('/:id')
.post(protectedRoutes, allowedTo('user'), createCashOrder)

orderRouter.post('/checkout/:id', protectedRoutes, allowedTo('user'), createCheckOutSession)


export default orderRouter