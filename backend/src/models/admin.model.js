import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true,
        minlength: 6
    }
},
    { timestamps: true }

)


const Admin = mongoose.model("Admin", adminSchema);

export default Admin; 