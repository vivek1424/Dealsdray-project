import jwt from 'jsonwebtoken'
import Admin from '../models/admin.model.js';

const validateToken=async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;
       
        
        if(!token){
            return res.status(401).json({error:"Unauthorized -no token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) //trying to verif the token 
        if(!decoded){
            return res.status(401).json({error:"Unauthorized -invalid token"});
        }

        const admin = await Admin.findById(decoded.userId).select("-password") ;
        
        if(!admin){
            return res.status(404).json({error: "User not found"}); 

        }

        req.admin = admin; 

        next();  //after this funtion runs, this statement suggests to call next function

        
    } catch (error) {
        console.log("Error in protect route middleware", error.message)
        res.status(500).json({ error: "Internal server error"});
    }
}


export default validateToken; 