// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/signupPage.jsx";
import CreateEmployeePage from "./pages/createEmployeePage.jsx";
import UpdateEmployeePage from "./pages/updateEmployeePage.jsx";
import DisplayEmployeePage from "./pages/displayEmployeePage.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import Layout from "./Layout/Layout.jsx";
import { useAppContext } from "./contexts/ContextAPI.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SearchPage from "./pages/searchEmployeePage.jsx";

const App = () => {
    const {isLoggedIn}= useAppContext();
    
    
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Layout><LoginPage /></Layout>} />
                <Route path="/signup" element={<Layout><SignupPage /></Layout>} />
                { isLoggedIn && <>
                <Route path="/create" element={<Layout><CreateEmployeePage /></Layout>} />
                <Route path="/update/:employeeId" element={<Layout><UpdateEmployeePage /></Layout>} />
                <Route path="/employees" element={<Layout><DisplayEmployeePage /></Layout>} />
                <Route path="/dashboard" element = {<Layout><DashboardPage/></Layout>} />
                <Route path="/search" element = {<Layout><SearchPage/></Layout>} />
                </>
                }
            </Routes>
        </Router>
    );
};

export default App;
