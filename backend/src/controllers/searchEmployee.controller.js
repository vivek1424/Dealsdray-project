import Employee from "../models/employee.model.js"; // Import the Employee model

// Function to construct the search query based on keyword
const constructSearchQuery = (keyword) => {
    if (!keyword) return {};  // If no keyword is provided, return an empty query object

    // Use regex to match the keyword case-insensitively across multiple fields
    return {
        $or: [
            { fullName: { $regex: keyword, $options: "i" } },  // Search in fullName
            { email: { $regex: keyword, $options: "i" } },     // Search in email
            { designation: { $regex: keyword, $options: "i" } }, // Search in designation
            { gender: { $regex: keyword, $options: "i" } },    // Search in gender
            { course: { $regex: keyword, $options: "i" } },    // Search in course

            // Special handling for the 'mobile' field since it's a Number
            {
                $expr: {
                    $regexMatch: {
                        input: { $toString: "$mobile" }, // Convert 'mobile' field to string
                        regex: keyword,
                        options: "i"
                    }
                }
            }
        ]
    };
};

// Search function for employees
const searchEmployees = async (req, res) => {
    try {
        // Get the search keyword from request query
        const { keyword } = req.query;

        // Construct the search query based on the keyword
        const query = constructSearchQuery(keyword);

        // Find employees that match the search query
        const employees = await Employee.find(query);

        // If no employees are found, return a message
        if (!employees.length) {
            return res.status(404).json({ message: "No employees found matching the keyword." });
        }

        // Return the found employees
        res.status(200).json({ employees });
    } catch (error) {
        console.log("Error in searchEmployees controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default searchEmployees;
