import slugify from "slugify"
import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from "../../../database/models/subcategory.model.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../../utils/api.features.js"


const addSubCategory = catchError(async (req, res, next) => {
        req.body.slug = slugify(req.body.name)
      let subcategory = new SubCategory (req.body)
      await subcategory.save()
      res.status(201).json({message:"Success", subcategory})
     }
)

const getSubCategories = catchError(async (req, res, next) =>{
        let filter = {}
        if(req.params.category) filter.category = req.params.category

        let apiFeatures = new ApiFeatures(SubCategory.find(filter), req.query)
                      .pagination().fields().filter().sort().search()
    
    let subCategories = await apiFeatures.mongooseQuery
        res.status(200).json({message:"Success", page: apiFeatures.pageNumber ,subCategories})
    }
)

const getSubCategory = catchError(async (req, res, next) => {
    let subcategory = await SubCategory.findById(req.params.id)
    subcategory || next (new AppError ("Subcategory is not found", 404))
    !subcategory || res.status(200).json({message:"Success", subcategory})
})

const updateSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body , {new:true})
    subcategory || next (new AppError ("Subcategory is not found", 404))
    !subcategory || res.status(200).json({message:"Success", subcategory})
})

const deleteSubCategory = deleteOne(SubCategory)


export {
    addSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}