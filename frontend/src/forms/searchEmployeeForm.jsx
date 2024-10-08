import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        fullName: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: ""
    });

    // Handle input change for each search field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        onSearch(searchParams); // Pass the search params to the parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="fullName"
                placeholder="Search by Full Name"
                value={searchParams.fullName}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Search by Email"
                value={searchParams.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="mobile"
                placeholder="Search by Mobile"
                value={searchParams.mobile}
                onChange={handleChange}
            />
            <select name="designation" value={searchParams.designation} onChange={handleChange}>
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
            </select>
            <select name="gender" value={searchParams.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <select name="course" value={searchParams.course} onChange={handleChange}>
                <option value="">Select Course</option>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="BSC">BSC</option>
            </select>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
