import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addProductValidSchema, updateProductValidSchema } from "./product.validation.js";


const productRoutes = Router()
productRoutes.route('/')
.post(uploadMixOfFiles([{name:'imageCover', maxCount:1}, {name:'images', maxCount:10}], 'products'), validate(addProductValidSchema),addProduct)
.get(getProducts)
productRoutes.route('/:id')
.get(getProduct)
.put(uploadMixOfFiles([{name:'imageCover', maxCount:1}, {name:'images', maxCount:10}], 'products'), validate(updateProductValidSchema),updateProduct)
.delete(deleteProduct)

export default productRoutes