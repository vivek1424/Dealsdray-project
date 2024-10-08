import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import '../styles/displayEmployee.css';

const DisplayEmployees = () => {
    const [employees, setEmployees] = useState([]); // State to hold employees data
    const [loading, setLoading] = useState(true); // State to show loading status
    const [totalEmployees, setTotalEmployees] = useState(0); // State to store the total number of employees
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch employees when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true); // Show loading state before fetching

                const response = await axios.get(`http://localhost:7000/api/employees`, {
                    withCredentials: true,
                }); // Fetch all employees

                // Handle the response structure based on your controller
                if (response.data && response.data.employees) {
                    setEmployees(response.data.employees); // Set employees data
                    setTotalEmployees(response.data.totalEmployees); // Set total employees count
                } else {
                    setEmployees([]); // If no employees, set an empty array
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
                setEmployees([]); // Set empty array on error
            } finally {
                setLoading(false); // Hide loading state after fetching
            }
        };

        fetchEmployees();
    }, []);

    // Function to handle deleting an employee
    const handleDelete = async (employeeId) => {
        try {
            const response = await axios.delete(`http://localhost:7000/api/employees/${employeeId}`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setEmployees(employees.filter(emp => emp._id !== employeeId)); // Remove the employee from the list
                setTotalEmployees(prevTotal => prevTotal - 1); // Update total employees count
            } else {
                console.error("Error deleting employee");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    // Function to handle updating an employee (navigate to update form)
    const handleUpdate = (employeeId) => {
        navigate(`/update/${employeeId}`); // Navigate to the update page with the employeeId as a parameter
    };

    // Function to navigate to the create employee page
    const handleCreateEmployee = () => {
        navigate("/create"); // Navigate to the create employee page
    };

    // Handling loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Employee List</h2>
            <p>Total Employees: {totalEmployees}</p>
            {/* Create Employee Button */}
            <button className="create-employee-button" onClick={handleCreateEmployee}>
                Create Employee
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Profile Picture</th>
                        <th>Actions</th> {/* Add actions column */}
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.fullName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.course}</td>
                                <td>
                                    {employee.profilePicture && (
                                        <img
                                            src={employee.profilePicture}
                                            alt="Profile"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="update-button"
                                        onClick={() => handleUpdate(employee._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No employees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayEmployees;
