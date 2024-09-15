import { Router } from "express";
import {  addSubCategory, deleteSubCategory, getSubCategories, getSubCategory,  updateSubCategory } from "./subcategory.controller.js";
import { validate } from "../../middleware/validate.js";
import { addSubCategorySchema, updateSubCategorySchema } from "./subcategory.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const subCategoryRoutes = Router()
subCategoryRoutes.route('/')
.post(protectedRoutes, allowedTo('admin'), validate(addSubCategorySchema), addSubCategory)
.get(getSubCategories)
subCategoryRoutes.route('/:id')
.get(getSubCategory)
.put(protectedRoutes, allowedTo('admin', 'manager'), validate(updateSubCategorySchema), updateSubCategory)
.delete(protectedRoutes, allowedTo('admin'), deleteSubCategory)

export default subCategoryRoutes