import Employee from "../models/employee.model.js";

const displayEmployees = async (req, res) => {
    try {
        // Retrieve all employees without pagination
        const employees = await Employee.find();

        // If no employees are found
        if (!employees || employees.length === 0) {
            console.log("no employeees found");
            
            return res.status(404).json({ message: "No employees found" });
        }
        console.log("total employees found are", employees.length);
        

        // Return the list of employees
        return res.status(200).json({
            totalEmployees: employees.length, // Total number of employees
            employees, // All employee data
        });
    } catch (error) {
        console.error("Error in fetching employees:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default displayEmployees;
