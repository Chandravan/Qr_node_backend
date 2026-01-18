import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    
    registrationNo:{
        type:String,
        required: true
    },
    action:{
        type:String,
        enum: ["EXIT", "ENTRY"],
        required:true
    },

} ,{timestamps:true});

const Log= mongoose.model("Log", logSchema);
export default Log;