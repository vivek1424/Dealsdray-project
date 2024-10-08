import Employee from "../models/employee.model.js";

const deleteEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;  // Get employee ID from request params

        // Find employee by ID and remove it
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        // Check if the employee was found and deleted
        if (deletedEmployee) {
            return res.status(200).json({ message: "Employee successfully deleted" });
        } else {
            return res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        console.log("Error in employee deletion", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default deleteEmployee;
