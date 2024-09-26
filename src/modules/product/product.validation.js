import Joi from 'joi'
import { generalFields } from '../../middleware/validate.js'

const addProductValidSchema = Joi.object({
    title: Joi.string().min(2).max(1000).required(),
    description: Joi.string().min(2).max(2000).required(),
    price: Joi.number().min(0).max(9000000).required(),
    rateCount:Joi.number().min(0).max(5).required(),
    file: {
        imageCover:Joi.array().items(generalFields.file.required()).length(1).required(),
        images:Joi.array().items(generalFields.file.required()).min(1).max(10).required(),
    }

})

const updateProductValidSchema = Joi.object({
    title: Joi.string().min(2).max(1000),
    description: Joi.string().min(2).max(2000),
    price: Joi.number().min(0).max(9000000),
    rateCount:Joi.number().min(0).max(5),
    file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }),
    id: Joi.string().hex().length(24).required()
})

export {
    addProductValidSchema,
    updateProductValidSchema
}