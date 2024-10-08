import Employee from "../models/employee.model.js";

const createEmployee = async (req, res) => {
    try {
        const { fullName, email, mobile, designation, gender, course } = req.body;

        // Validate that all required fields are present
        if (!fullName || !email || !mobile || !designation || !gender || !course) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if an employee with the same email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with this email already exists." });
        }

        const profilePicture = req.file?.path; // Optional profile picture
        const lastupdated = new Date();

        // Create a new employee instance
        const newEmployee = new Employee({
            fullName,
            email,
            mobile,
            designation,
            gender,
            course,
            profilePicture,
            lastupdated
        });

        // Save the new employee to the database
        await newEmployee.save();
        return res.status(201).json({ message: "Employee successfully created" });
    } catch (error) {
        console.log("Error in employee creation:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default createEmployee;
