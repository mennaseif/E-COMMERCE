import Joi from 'joi'

const addBrandValidSchema = Joi.object({
    name: Joi.string().min(2).max(1000).required(),
})

const updateBrandValidSchema = Joi.object({
    name: Joi.string().min(2).max(1000),
    id: Joi.string().hex().length(24).required()
})

export {
    addBrandValidSchema,
    updateBrandValidSchema
}