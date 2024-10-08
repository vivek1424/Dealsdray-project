import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true,
        enum: ["HR", "Sales", "Manager"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    course:{
        type: String,
        required: true,
        enum: ["MCA", "BCA", "BSC"]
    },
    profilePicture: {
        type: String,
        required: true,
        default: ""
    },
    lastupdated: {
        type: String, 
        required: true
    }
},
   

)


const Employee = mongoose.model("Employee", employeeSchema);

export default Employee; 