import Joi from 'joi'

const addToWishlistValidSchema = Joi.object({
    product: Joi.string().min(2).max(24).required(),
})


export {
    addToWishlistValidSchema
}