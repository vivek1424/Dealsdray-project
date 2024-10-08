import Employee from "../models/employee.model.js";

// Controller function to get an employee by ID
const getEmployeeById = async (req, res) => {
    const { employeeId } = req.params;

    try {
        // Fetch the employee from the database
        const employee = await Employee.findById(employeeId);

        // If the employee is not found, return 404
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Return the employee data
        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export default getEmployeeById;
