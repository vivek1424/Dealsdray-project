// src/pages/SignupPage.js
import React from "react";

import DisplayEmployees from "../forms/displayEmployeeForm.jsx";
import SearchPage from "./searchEmployeePage.jsx";

import '../styles/displayPage.css'

const DisplayEmployeePage = () => {
    return (
        <div className="display-content"> 
            <SearchPage/>  
            <DisplayEmployees />
        </div>
    );
};

export default DisplayEmployeePage;
