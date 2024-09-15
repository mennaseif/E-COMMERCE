import Joi from 'joi'

const addReviewValidSchema = Joi.object({
    comment: Joi.string().min(1).max(1000).required(),
    rate: Joi.number().min(0).max(5).required(),
    product: Joi.string().min(2).max(24).required(),
})

const updateReviewValidSchema = Joi.object({
    comment: Joi.string().min(1).max(1000),
    rate: Joi.number().min(0).max(5),
    product: Joi.string().min(2).max(24).required(),
    id: Joi.string().hex().length(24).required()
})

export {
    addReviewValidSchema,
    updateReviewValidSchema
}