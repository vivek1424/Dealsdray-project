// src/components/SignupForm.js
import React, { useState } from "react";
import axios from "../utils/api.js";  // Axios instance for making API requests
import "../styles/SignupForm.css";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("/auth/signup", formData);  // API call to signup
            setSuccess("Signup successful!");
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="signup-form">
            <h2>Admin Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default SignupForm;
