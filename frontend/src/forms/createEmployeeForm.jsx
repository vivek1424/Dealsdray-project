import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/EmployeeForm.css'; 

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '', // Change to single course selection
        profilePicture: null,
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        if (e.target.name === 'profilePicture') {
            setFormData({ ...formData, profilePicture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const validateForm = () => {
        let errorMessages = [];
        if (!formData.fullName) errorMessages.push('Full name is required.');
        if (!formData.email) errorMessages.push('Email is required.');
        if (!/\S+@\S+\.\S+/.test(formData.email)) errorMessages.push('Email is invalid.');
        if (!formData.mobile) errorMessages.push('Mobile number is required.');
        if (!/^\d{10}$/.test(formData.mobile)) errorMessages.push('Mobile number must be 10 digits.');
        if (!formData.designation) errorMessages.push('Designation is required.');
        if (!formData.gender) errorMessages.push('Gender is required.');
        if (!formData.course) errorMessages.push('Course is required.');
        if (!formData.profilePicture) errorMessages.push('Profile picture is required.'); // Check if profile picture is provided

        return errorMessages; // Return an array of error messages
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setError(validationErrors.join(' ')); // Join and set error messages
            return;
        } else {
            setError(''); // Clear error messages if validation passes
        }

        try {
            const form = new FormData();
            for (let key in formData) {
                form.append(key, formData[key]);
            }

            const response = await axios.post('http://localhost:7000/api/create', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.status === 201) {
                setMessage('Employee successfully created!');
                setFormData({
                    fullName: '',
                    email: '',
                    mobile: '',
                    designation: '',
                    gender: '',
                    course: '', // Reset to empty string
                    profilePicture: null,
                });
                navigate('/employees'); // Navigate to employee list
            } else {
                setMessage('Error occurred while creating employee.');
            }
        } catch (error) {
            setMessage('Error in employee creation: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="employee-form">
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Designation:</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
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
                                checked={formData.gender === "male"}
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
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                                required
                            />
                            Female
                        </label>
                    </div>
                </div>
                <div>
                    <label>Course:</label>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Course</option>
                        <option value="MCA">MCA</option>
                        <option value="BCA">BCA</option>
                        <option value="BSC">BSC</option>
                    </select>
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        name="profilePicture"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Employee</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
        </div>
    );
};

export default EmployeeForm;
