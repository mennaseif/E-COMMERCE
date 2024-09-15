import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addReview, deleteReview, getReview, updateReview } from "./review.controller.js";
import { validate } from "../../middleware/validate.js";
import { addReviewValidSchema, updateReviewValidSchema } from "./review.validation.js";


const reviewRoutes = Router()
reviewRoutes.route('/')
.post(protectedRoutes, allowedTo('user'), validate(addReviewValidSchema), addReview)
.get(getReview)
reviewRoutes.route('/:id')
.get(getReview)
.put(protectedRoutes, allowedTo('user'), validate(updateReviewValidSchema), updateReview)
.delete(protectedRoutes, allowedTo('user', 'admin'), deleteReview)

export default reviewRoutes