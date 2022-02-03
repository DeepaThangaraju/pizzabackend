import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config()

var MONGO_URL=process.env.MONGO_URL;

const connect=async()=>{
    try{
    await mongoose.connect(MONGO_URL);
    console.log("connected")
}catch(err){
    console.log(err);
}
}
export {connect}