import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    registrationNo:{
        type:String,
        required:true,
        unique:true,
    },
    branch:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["IN", "OUT"],
        default: "IN"
    }

    
},{timestamps:true});

const Student = mongoose.model("Student", studentSchema);

export default Student