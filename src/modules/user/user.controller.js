import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../../utils/api.features.js"
import { User } from "../../../database/models/user.model.js"


const addUser = catchError(async (req, res, next) => {
      let user = new User (req.body)
      await user.save()
      res.status(201).json({message:"Success", user})
     }
)

const getUsers = catchError(async (req, res, next) =>{
    let apiFeatures = new ApiFeatures(User.find(), req.query)
    .pagination().fields().filter().sort().search()

    let users= await apiFeatures.mongooseQuery
        res.status(200).json({message:"Success", page: apiFeatures.pageNumber, users})
    }
)

const getUser = catchError(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    user || next (new AppError ("User is not found", 404))
    !user || res.status(200).json({message:"Success", user})
})

const updateUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body , {new:true})
    user || next (new AppError ("User is not found", 404))
    !user || res.status(200).json({message:"Success", user})
})

const deleteUser = deleteOne(User)


export {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}