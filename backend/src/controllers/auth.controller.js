import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, email, password, confirmPassword} = req.body;
		
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const alreadyPresent = await Admin.findOne({ email });

		if(alreadyPresent){
			return res.status(501).json({error: "This email is already in use"})
		}

		
		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//take the profile picture input from the 
	
		const newAdmin = new Admin({
			fullName,
			email,
			password: hashedPassword, 
		});

		if (newAdmin) {
			// Generate JWT token here
			await newAdmin.save();
			generateTokenAndSetCookie(newAdmin._id, res);
			

			res.status(201).json({
				_id: newAdmin._id,
				fullName: newAdmin.fullName,
				email: newAdmin.email,
				profilePic: newAdmin.profilePic,
				mobile: newAdmin.mobile,
				designation: newAdmin.designation,
				course: newAdmin.course
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
		if(!email){ 
			return res.status(401).json({error: "Email is required"})
		}
		if(!password){
			return res.status(401).json({error: "Password is required"})
		}
        const admin = await Admin.findOne({ email });  //returns the document that matches the username

		if (!admin) {
            return res.status(400).json({ error: "Invalid username, no such user exists" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin?.password || ""); //in case the user fails, 
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        generateTokenAndSetCookie(admin._id, res)

        res.status(200).json({
            _id: admin._id,
            fullName: admin.fullName,
            username: admin.email,
            profilePicture: admin.profilePic
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: " Internal server error" })
    }
}

export const logout = (req, res) => {

	try {
		 res.cookie("jwt", "", {maxAge:0});
		 res.status(200).json({ message: "Logged out succesfully"})  
	} catch (error) {
		 console.log("Error in logout controller", error.message);
		 res.status(500).json({ error: " Internal server error" })
	}
 }


 export const verifyToken = (req, res) => {
    if (!req.admin) {
        return res.status(401).send({ error: "Unauthorized - No admin found" });
    }

    res.status(200).send({ userId: req.admin._id }); // Send admin's ID
};



// Controller to return admin details
export const getAdminDetails = async (req, res) => {
    try {
        // Use the admin object from the middleware
        const admin = req.admin; 

        if (!admin) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Send the admin details in the response
        res.status(200).json({
            _id: admin._id,
            fullName: admin.fullName,
            email: admin.email,
            profilePicture: admin.profilePic,
        });
    } catch (error) {
        console.error("Error fetching admin details:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

