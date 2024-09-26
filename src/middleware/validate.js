import { AppError } from "../../utils/appError.js";
import Joi from "joi";


export const generalFields ={
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

    images: Joi.object ([
        {
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
}]),

   imageCover: Joi.object ({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
    size: Joi.number().max(5242880).required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required() 
  })
}


export const validate = (schema) =>{
    return (req, res, next) =>{
        let inputsDate = {...req.body,...req.params,...req.query}
        if (req.file || req.files){
            inputsDate.file = req.file ||req.files
        }
        let {error} = schema.validate(inputsDate, {abortEarly:false})
        if(!error){
            next()
        }else{
            let errMsg = error.details.map (err=> err.message)
            next (new AppError (errMsg,401))
        }
    }
}


  
