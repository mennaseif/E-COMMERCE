/*import Joi from "joi";


const addUserValidSchema = Joi.object({
    name: Joi.string().min(2).max(1000).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),
})

const updateUserValidSchema = Joi.object({
    name: Joi.string().min(2).max(1000),
    email: Joi.string().min(2).max(2000),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/),
    id: Joi.string().hex().length(24).required()
})

export{
    addUserValidSchema,
    updateUserValidSchema
}*/