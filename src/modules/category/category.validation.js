import Joi from "joi";
import { generalFields } from "../../middleware/validate.js";

const addCategorySchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    //file: generalFields.file.required()
   file: generalFields.file.required()
})

const updateCategorySchema = Joi.object({
    name: Joi.string().min(1).max(50),
    file: generalFields.file.optional(),
    id: Joi.string().hex().length(24).required()
})

export{
    addCategorySchema,
    updateCategorySchema
}