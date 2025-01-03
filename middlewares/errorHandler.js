export const errorHandler =(error,req,res,next)=>{
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    res.status(error.statusCode).json({
        status:error.status,
        message:error.message
    })
}
export const catchErrorHandler = (func)=>{   // it expects async function only
    return (req,res,next)=>{
        func(req,res,next).catch(err=>next(err))
    }
}