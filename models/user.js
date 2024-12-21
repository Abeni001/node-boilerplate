import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
    {
        name:{
            type:String
        },
        password:String,
        confirm_password:String,
        email:{
            type:String,
            required:true,
        },
        phone_number:String,
        verified_at:{
            default:null,
            type:Date
        },
    },
    {
        timestamps: true
    }
)
userSchema.index({ email: 1 }, { unique: true });
const User  = mongoose.model('user',userSchema)

export default User