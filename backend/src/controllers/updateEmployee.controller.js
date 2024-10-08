// controllers/employee.controller.js
import Employee from "../models/employee.model.js";

export const updateEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;  // Get employee ID from URL params
        const { fullName, email, mobile, designation, gender, course } = req.body;
        const profilePic = req.file?.path;  // Optional file for profile picture
        const lastupdated = new Date(); // Capture the current date for last updated

        // Check if another employee with the same email exists (excluding the current employee)
        const existingEmployee = await Employee.findOne({ email, _id: { $ne: employeeId } });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with this email already exists." });
        }

        // Find the employee by ID and update the fields
        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,  // The ID of the employee to update
            {
                fullName,
                email,
                mobile,
                designation,
                gender,
                course,
                profilePic,
                lastupdated,  // Update the last updated field
            },
            { new: true }  // Return the updated employee
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmployee,  // Return the updated employee details
        });
    } catch (error) {
        console.log("Error in updating employee:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default updateEmployee;
