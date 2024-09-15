

export function catchError(callBack){
    return(req, res, next) =>{
        callBack(req, res, next).catch(err=>{
            res.status(500).json({err: err.message})
        })
    }
}