import slugify from "slugify"
import {  Brand } from "../../../database/models/brand.model.js"
import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../../utils/api.features.js"


const addBrand = catchError(async (req, res, next) => {
      req.body.slug = slugify(req.body.name)
      req.body.logo = req.file.filename 
      let brand = new Brand (req.body)
      await brand.save()
      res.status(201).json({message:"Success", brand})
     }
)

const getBrands = catchError(async (req, res, next) =>{

    let apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .pagination().fields().filter().sort().search()

    let brands = await apiFeatures.mongooseQuery
        res.status(200).json({message:"Success", page: apiFeatures.pageNumber, brands})
    }
)

const getBrand = catchError(async (req, res, next) => {
    let brand = await Brand.findById(req.params.id)
    brand || next (new AppError ("Brand is not found", 404))
    !brand || res.status(200).json({message:"Success", brand})
})

const updateBrand = catchError(async (req, res, next) => {
    if(req.body.slug) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.logo = req.file.filename 
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body , {new:true})
    brand || next (new AppError ("Brand is not found", 404))
    !brand || res.status(200).json({message:"Success", brand})
})

const deleteBrand = deleteOne(Brand)


export {
    addBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand
}