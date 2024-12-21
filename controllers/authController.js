import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import PasswordReset from "../models/password_reset.js"
import Blacklist from "../models/blacklist.js"
import customError from "../utils/customError.js"

const signToken = (id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'5min'})
}

export const signup = async(req,res,next)=>{
    const { email,password,confirm_password } = req.body
    if(!email&& email == '' || !password|| password =='' || !confirm_password || confirm_password ==''){
        const err = new customError('email and password are required',422)
        return next(err)
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExist = await User.findOne({email});
    if(userExist){
        const err = new customError('Email already exists',400)
        return next(err)
    }
    const user = await User.create({
        email:email,
        name:'Test',
        password:hashedPassword,
        confirm_password:hashedPassword,
    })
    return res.status(201).json({
        status:'success',
        message:'successfully created',
        data:user
    });
    
}

export const login = async(req,res,next)=>{
    const { email,password } = req.body
    // fetch and check user crendetials.
    const user = await User.findOne({email})
    if(!user){
        const err = new customError('Invalid credentials',404) 
        return next(err)
    }
    let passwordMatch =await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        const err = new customError('Invalid credentials',404) 
        return next(err)
    }
    const token =  signToken(user._id);

    return res.status(200).json({
        status:'success',
        message:'sucessfully logged in',
        user,
        token
    })
    
}
export const profile =async(req,res)=>{
    const {id} = req.userId
    const user =await User.findById(id)
    return res.json({
        user
    })
}
export const logout = async(req,res)=>{
    const token = req.token
    await Blacklist.create({token})
    return res.json({
        status:'success',
        message:'successfuly logged out'
    })
}
export const forgetPassword =async(req,res,next)=>{
    const{ email } = req.body
    const user =await User.findOne({email})
    if(!user){
        const err = new customError('Invalid Email',404)
        return next(err)
    }
    const token = crypto.randomBytes(32).toString("hex")
    await PasswordReset.create({
        email,
        token
    })
    // send email functionality here
    res.json({
        'token':token,
        message:'this token will expire after 5min'
    })
}
export const resetPassword = async(req,res,next)=>{
        const {token} = req.query
        const existToken =  await PasswordReset.findOne({token})

        if(!existToken){
            const err = new customError('Invalid token',400)
           return next(err)
        }
        let now = new Date();
        const createdAt = new Date(existToken.createdAt)

        const expireTime = new Date(createdAt.getTime() + ( 5 * 60 * 1000 ))
        if(expireTime > now){
            const err = new customError('expired token',400)
            return next(err)
        }
        const user = await User.findOne({email:existToken.email})
        const {newPassword} = req.body
        let hashedPassword = await bcrypt.hash(newPassword,10)

        user.password = hashedPassword;
        user.confirm_password = hashedPassword;
        user.save()
        await PasswordReset.deleteOne();
        
        return res.json({
            status:'success',
            message:'password successfully changed!'
        })

}