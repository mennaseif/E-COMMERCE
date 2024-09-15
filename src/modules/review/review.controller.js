import slugify from "slugify"
import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { Review } from "../../../database/models/review.model.js"


const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let isExist = await Review.findOne({ user: req.user._id, product: req.body.product })
    if (isExist) return next (new AppError("You created a review before" ,409))
      let review = new Review (req.body)
      await review.save()
      res.status(201).json({message:"Success", review})
     }
)

const getReviews = catchError(async (req, res, next) =>{
    let reviews = await Review.find()
        res.status(200).json({message:"Success",reviews})
    }
)

const getReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let review = await Review.findById(req.params.id)
    review || next (new AppError ("Review is not found", 404))
    !review || res.status(200).json({message:"Success", review})
})

const updateReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndUpdate({ _id: req.params.id, user: req.user._id}, req.body , {new:true})
    review || next (new AppError ("Review is not found or you are not created review", 404))
    !review || res.status(200).json({message:"Success", review})
})

const deleteReview = deleteOne(Review)


export {
    addReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
}