import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAddress, getLoggedUserAddress, removeAddress } from "./address.controller.js";
import { validate } from "../../middleware/validate.js";
import { addAddressValidSchema } from "./address.validation.js";


const addressRoutes = Router()
addressRoutes.route('/')
.patch(protectedRoutes, allowedTo('user'), validate(addAddressValidSchema), addAddress)
.get(protectedRoutes, allowedTo('user'), getLoggedUserAddress)

addressRoutes.route('/:id')
.delete(protectedRoutes, allowedTo('user', 'admin'), removeAddress)


export default addressRoutes