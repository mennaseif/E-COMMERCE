import slugify from "slugify"
import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Product } from "../../../database/models/product.model.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../../utils/api.features.js"


const addProduct = catchError(async (req, res, next) => {  //{} 
      req.body.slug = slugify(req.body.title)
      if(req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename
      if(req.files.images) req.body.images = req.files.images.map(img => img.filename)
      let product = new Product (req.body)
      await product.save()
      res.status(201).json({message:"Success", product})
     }
)

const getProducts = catchError(async (req, res, next) =>{

    let apiFeatures = new ApiFeatures(Product.find(), req.query)
    .pagination().fields().filter().sort().search()

    let products = await apiFeatures.mongooseQuery
    res.status(200).json({message:"Success", page: apiFeatures.pageNumber ,products})
}
)

const getProduct= catchError(async (req, res, next) => {
    let product= await Product.findById(req.params.id)
    product || next (new AppError ("Product is not found", 404))
    !product || res.status(200).json({message:"Success", product})
})

const updateProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    let product = await Product.findByIdAndUpdate(req.params.id, req.body , {new:true})
    product || next (new AppError ("Product is not found", 404))
    !product|| res.status(200).json({message:"Success", product})
})

const deleteProduct = deleteOne(Product)


export {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}