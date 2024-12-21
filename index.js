import express from "express";
import dotenv from "dotenv";
import api from "./routes/api.js"
import connectDb from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
// import web from "./routes/web.js"
dotenv.config()
connectDb()

const port = process.env.PORT 
const app = express()
app.use(express.json())    // to convert request to json


// app.use('/',web);
app.use('/api',api)
app.use(errorHandler)
app.listen(port,()=>{
    console.log('listening '+ port)
})