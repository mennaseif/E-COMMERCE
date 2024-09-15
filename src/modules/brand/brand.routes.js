import { Router } from "express";
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addBrandValidSchema, updateBrandValidSchema } from "./brand.validation.js";


const brandRoutes = Router()
brandRoutes.route('/')
.post(protectedRoutes,uploadSingleFile('logo', 'brands'), validate(addBrandValidSchema), addBrand)
.get(getBrands)
brandRoutes.route('/:id')
.get(getBrand)
.put(uploadSingleFile('logo', 'brands'), validate(updateBrandValidSchema), updateBrand)
.delete(deleteBrand)

export default brandRoutes