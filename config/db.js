import mongoose from "mongoose";

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI
        ,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        console.log('mongoDb connected!')
    }catch(e){
        console.error(`Error:${e.message}`)
        process.exit(1)
    }
}

export default connectDb;