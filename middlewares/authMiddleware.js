import jwt from 'jsonwebtoken'
import customError from '../utils/customError.js';
import { catchErrorHandler } from './errorHandler.js';
import User from '../models/user.js'

export const verifyToken =catchErrorHandler(async(req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1]
    //read anc check the token existence
    if(!token){
        const err = new customError('Access denied.UnAuthenticated request',401)
        return next(err)
    }
    //token validation
    const verified = jwt.verify(token,process.env.JWT_SECRET)

    // check use existence
    const user =  await User.findById(verified.id)
    if(!user){
    const err = new customError('Access denied.User not found',401)
    return next(err)
    }

    // check if the use changed his password after the token is given
    const isPasswordChanged = await user.isPasswordChanged(verified.iat)
    if(isPasswordChanged){
    const err = new customError('Access denied.You can not access this page you need to Relogin',401)
    return next(err)
    }

    req.userId = verified;
    next()
})

// export default verifyToken