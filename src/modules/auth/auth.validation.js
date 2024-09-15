/*import Joi from "joi";


const signupValidSchema= Joi.object({
    name:Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),
})

const signinValidSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required()
})

const changeUserPasswordValidSchema = Joi.object({
    email: Joi.string().email().required(),
    oldPassword: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    newPassword: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required()
})

export{
    signupValidSchema,
    signinValidSchema,
    changeUserPasswordValidSchema
}*/