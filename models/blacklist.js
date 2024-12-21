import mongoose , { model, Schema } from "mongoose";

const blackListSchema = Schema({
    token:{
        type:String,
        require:true
    }
},{timestamps:true})

const Blacklist = mongoose.model('blacklist',blackListSchema)

export default Blacklist