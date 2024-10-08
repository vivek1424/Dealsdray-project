import React, { useState } from "react";
import axios from "axios"; // To make API requests
import '../styles/searchPage.css'

const SearchPage = () => {
    const [keyword, setKeyword] = useState(""); // State to store the search keyword
    const [searchResults, setSearchResults] = useState([]); // State to store search results
    const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages

    // Function to handle search request
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent the page from refreshing
        try {
            // Send GET request to backend with the search keyword
            const response = await axios.get("http://localhost:7000/api/search", {
                params: { keyword }, // Send keyword as a query parameter
                withCredentials: true, // Ensure credentials are sent if required
            });

            // Update the search results with data from the response
            setSearchResults(response.data.employees);
            setErrorMessage(""); // Clear any previous error messages
        } catch (error) {
            console.error("Error searching employees:", error);
            setErrorMessage(error.response?.data?.message || "No employees found.");
            setSearchResults([]); // Clear previous results if there's an error
        }
    };

    return (
        <div>
            <h2>Search Employees</h2>
            {/* Search form */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter keyword (e.g., name, email)"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)} // Update keyword state
                    required
                />
                <button className="search" type="submit">Search</button>
            </form>

            {/* Error message */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {/* Display search results in tabular form */}
            {searchResults.length > 0 && (
                <div>
                    <h3>Search Results:</h3>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Profile Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((employee) => (
                                <tr key={employee._id}>
                                    <td>{employee.fullName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.course}</td>
                                    <td>
                                        {employee.profilePicture ? (
                                            <img src={employee.profilePicture} alt="profile" width="50px" />
                                        ) : (
                                            "No Picture"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
