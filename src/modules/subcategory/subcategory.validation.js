import Joi from "joi";

const addSubCategorySchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    category: Joi.string().hex().length(24).required(),
    createdBy: Joi.string().hex().length(24).required()

})

const updateSubCategorySchema = Joi.object({
    name: Joi.string().min(1).max(50),
    category: Joi.string().hex().length(24).required(),
    createdBy: Joi.string().hex().length(24).required(),
    id: Joi.string().hex().length(24).required()
})

export{
    addSubCategorySchema,
    updateSubCategorySchema
}