import Blacklist from "../models/blacklist.js"
import customError from "../utils/customError.js"
import { catchErrorHandler } from "./errorHandler.js"

export const isValidToken =catchErrorHandler(async (req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1]
    if(!token)
    {
        const err = new customError('Access denied.UnAuthenticated request',400)
        return next(err)
    }
    const blacklist = await Blacklist.findOne({token})
    if(blacklist)
    {
        const err = new customError('Access denied.Invalid or expired token',400)
        return next(err)
    }
    req.token = token
    next()
})