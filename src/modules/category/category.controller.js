import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../../utils/api.features.js"


const addCategory = catchError(async (req, res, next) => {
      req.body.slug = slugify(req.body.name)
      req.body.image = req.file.filename 
      let category = new Category (req.body)
      await category.save()
      res.status(201).json({message:"Success", category})
     }
)

const getCategories = catchError(async (req, res, next) =>{
         let apiFeatures = new ApiFeatures(Category.find(), req.query)
             .pagination().fields().filter().sort().search()
    
    let categories = await apiFeatures.mongooseQuery
        res.status(200).json({message:"Success", page: apiFeatures.pageNumber, categories})
    }
)

const getCategory = catchError(async (req, res, next) => {
    let category = await Category.findById(req.params.id)
    category || next (new AppError ("Category is not found", 404))
    !category || res.status(200).json({message:"Success", category})
})

const updateCategory = catchError(async (req, res, next) => {
    if(req.body.slug) req.body.slug = slugify(req.body.name)
     if (req.file) req.body.image = req.file.filename 
    let category = await Category.findByIdAndUpdate(req.params.id, req.body , {new:true})
    category || next (new AppError ("Category is not found", 404))
    !category || res.status(200).json({message:"Success", category})
})

const deleteCategory = deleteOne(Category)


export {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}