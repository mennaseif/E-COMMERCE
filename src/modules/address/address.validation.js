import Joi from 'joi'

const addAddressValidSchema = Joi.object({
    city: Joi.string().min(2).max(500).required(),
    phone: Joi.string().pattern(/^(\+20|0)?1[0125]\d{8}$/).required(),
    street: Joi.string().min(2).max(500).required()
})


export {
    addAddressValidSchema
}