import jwt from 'jsonwebtoken'
import customError from '../utils/customError.js';
import { catchErrorHandler } from './errorHandler.js';

export const verifyToken =catchErrorHandler(async(req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1]

    if(!token){
        const err = new customError('Access denied.UnAuthenticated request',400)
        return next(err)
    }
    const verified = jwt.verify(token,process.env.JWT_SECRET)
    req.userId = verified;
    next()
})

// export default verifyToken