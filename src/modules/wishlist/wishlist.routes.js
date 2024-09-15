import { Router } from "express";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addToWishlistValidSchema } from "./wishlist.validation.js";


const wishlistRoutes = Router()
wishlistRoutes.route('/')
.patch(protectedRoutes, allowedTo('user'), validate(addToWishlistValidSchema) ,addToWishlist)
.get(protectedRoutes, allowedTo('user'), getLoggedUserWishlist)

wishlistRoutes.route('/:id')
.delete(protectedRoutes, allowedTo('user', 'admin'), removeFromWishlist)


export default wishlistRoutes