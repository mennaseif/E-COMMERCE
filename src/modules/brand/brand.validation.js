import Joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

const addBrandValidSchema = Joi.object({
    name: Joi.string().min(2).max(1000).required(),
    file: generalFields.file.required()
})

const updateBrandValidSchema = Joi.object({
    name: Joi.string().min(2).max(1000),
    file: generalFields.file.optional(),
    id: Joi.string().hex().length(24).required()
})

export {
    addBrandValidSchema,
    updateBrandValidSchema
}