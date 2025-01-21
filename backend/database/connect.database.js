import mongoose from "mongoose";
import { config } from "dotenv";

config();

const mongoURI = process.env.MONGO_URI;

export async function connectDatabase(){
    try{
        await mongoose.connect(mongoURI)
        console.log("Database connected")
    }catch(err){
        console.log("error in conecting to database",err)
    }
}