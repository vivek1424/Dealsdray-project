import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/updateEmployeeForm.css';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmployeeForm = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate(); // Initialize navigate for redirection
    const [employeeData, setEmployeeData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: "", 
        profilePicture: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the existing employee data
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/employees/${employeeId}`, {
                    withCredentials: true
                });
                // Set the employee data from the fetched response
                setEmployeeData({
                    fullName: response.data.fullName || "",
                    email: response.data.email || "",
                    mobile: response.data.mobile || "",
                    designation: response.data.designation || "",
                    gender: response.data.gender || "",
                    course: response.data.course || "",
                    profilePicture: null,
                });
            } catch (error) {
                console.error("Error fetching employee data:", error);
                toast.error("Failed to fetch employee data!");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'course') {
            // Handle course checkboxes
            const updatedCourse = employeeData.course.includes(value)
                ? employeeData.course.filter(course => course !== value)
                : [...employeeData.course, value];
            setEmployeeData({ ...employeeData, course: updatedCourse });
        } else {
            setEmployeeData({ ...employeeData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setEmployeeData({ ...employeeData, profilePicture: e.target.files[0] });
    };

    const validateForm = () => {
        let errors = [];
        if (!employeeData.fullName) errors.push('Full name is required.');
        if (!employeeData.email) errors.push('Email is required.');
        if (!/\S+@\S+\.\S+/.test(employeeData.email)) errors.push('Email is invalid.');
        if (!employeeData.mobile) errors.push('Mobile number is required.');
        if (!/^\d{10}$/.test(employeeData.mobile)) errors.push('Mobile number must be 10 digits.');
        if (!employeeData.designation) errors.push('Designation is required.');
        if (!employeeData.gender) errors.push('Gender is required.');
        if (!employeeData.profilePicture) errors.push('Profile picture is required.'); // Check if profile picture is provided

        return errors.length ? errors : null; // Return errors if any
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const validationErrors = validateForm();
        if (validationErrors) {
            validationErrors.forEach(error => toast.error(error)); // Display all error messages
            return;
        }

        const formData = new FormData();
        for (const key in employeeData) {
            formData.append(key, employeeData[key]);
        }

        try {
            const response = await axios.put(`http://localhost:7000/api/update/${employeeId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            toast.success("Employee updated successfully!");
            console.log("Employee updated successfully:", response.data);

            // Redirect to the employee list page after success
            navigate('/employees'); // Adjust the path as per your route
        } catch (error) {
            console.error("Error updating employee:", error);
            toast.error("Failed to update employee!");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Update Employee</h2>
                <input
                    type="text"
                    name="fullName"
                    value={employeeData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="tel"
                    name="mobile"
                    value={employeeData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
                    required
                />
                <div>
                    <label>Designation:</label>
                    <select
                        name="designation"
                        value={employeeData.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={employeeData.gender === "male"}
                                onChange={handleChange}
                                required
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={employeeData.gender === "female"}
                                onChange={handleChange}
                                required
                            />
                            Female
                        </label>
                    </div>
                </div>
                <div>
                    <label>Course:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="MCA"
                                checked={employeeData.course.includes("MCA")}
                                onChange={handleChange}
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BCA"
                                checked={employeeData.course.includes("BCA")}
                                onChange={handleChange}
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BSC"
                                checked={employeeData.course.includes("BSC")}
                                onChange={handleChange}
                            />
                            BSC
                        </label>
                    </div>
                </div>
                <input
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                    required // Make file input required
                />
                <button type="submit">Update Employee</button>
            </form>

            {/* Toast container */}
            <ToastContainer />
        </>
    );
};

export default UpdateEmployeeForm;
