import { AppError } from "../../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"


export const deleteOne =(model) =>{
    return catchError(async (req, res, next) => {
        let document= await model.findByIdAndDelete(req.params.id)
        document|| next (new AppError ("Document is not found", 404))
       !document || res.status(200).json({message:"Success", document})
    })  
}