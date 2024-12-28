import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        name:{
            type:String
        },
        password:{
            type:String,
            required:true,
            select:false        //hide the password when the use model is accessed
        },
        confirm_password:{
            type:String,
            required:true,
            validate:{
                validator:function(val){
                   return this.password == val
                },
                message:'the password does not match'
            }
        },
        email:{
            type:String,
            required:true,
        },
        phone_number:String,
        verified_at:{
            default:null,
            type:Date
        },
        password_changed_at:{
            default:null,
            type:Date
        },
    },
    {
        timestamps: true
    }
)
userSchema.pre('save',function(next){
    if(this.isModified('password')){
        // this.password = bcrypt.hash(12,this.password)    // we can also hash the password here
        this.confirm_password = undefined
    }
    next()
})
userSchema.methods.isPasswordChanged = async function(time){
        if(this.password_changed_at){
           return time <  (this.password_changed_at.getTime() / 1000)
        }
        return false
}
userSchema.index({ email: 1 }, { unique: true });
const User  = mongoose.model('user',userSchema)

export default User