import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/Dashboard.css'; // Import CSS for styling
import { useAppContext } from '../contexts/ContextAPI';


const Dashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const {admin} =useAppContext()
    const handleNavigate = (path) => {
        navigate(path); // Use navigate instead of history.push
    };

    return (
        <div className="dashboard">
            <h2>Welcome to the Employee Management Dashboard!</h2> {/* Welcome message */}
            <h3>{admin}</h3> {/* Admin title */}
           
        </div>
    );
};

export default Dashboard;
