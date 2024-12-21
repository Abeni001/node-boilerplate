import mongoose, { Schema } from "mongoose";

const password_resetSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true})

const PasswordReset = mongoose.model('password_reset',password_resetSchema)

export default PasswordReset