import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { addCategorySchema, updateCategorySchema } from "./category.validation.js";
import { validate } from "../../middleware/validate.js";
import subCategoryRoutes from "../subcategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const categoryRoutes = Router({mergeParams:true})

categoryRoutes.use('/:category/subcategories', subCategoryRoutes)
categoryRoutes.route('/')
.post(protectedRoutes, allowedTo('admin') ,uploadSingleFile('image', 'categories'), validate(addCategorySchema), addCategory)
.get(getCategories)

categoryRoutes.route('/:id')
.get(getCategory)
.put(protectedRoutes, allowedTo('admin', 'manager'), uploadSingleFile('image', 'categories'),validate(updateCategorySchema), updateCategory)
.delete(protectedRoutes, allowedTo('admin'), deleteCategory)

export default categoryRoutes