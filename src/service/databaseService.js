import config from "../config/config.js";
import mongoose from "mongoose";

const connectDB= async () => {
    try{
        await mongoose.connect(config.DATABASE_URL)
        console.info("Database connected");
        return mongoose.connection
        

    } catch (err){
        throw err
    }
}

export default connectDB