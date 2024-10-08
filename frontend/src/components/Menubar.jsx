import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/menuBar.css'; // Optional: Use for styling
import { useAppContext } from '../contexts/ContextAPI'; // Import the context

const MenuBar = () => {
    const [adminName, setAdminName] = useState('Admin');
    const { logout } = useAppContext(); // Access the logout function from context
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the admin's name (if it's available from an API)
        const fetchAdminName = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/admin', {
                    withCredentials: true,
                });
                setAdminName(response.data.fullName);  // Assuming the admin's name is returned in the response
            } catch (error) {
                console.error('Error fetching admin name:', error);
            }
        };

        fetchAdminName();
    }, []);

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function from context
            navigate('/login'); // Redirect to the login page after logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="menu-bar">
            <div className="menu-items">
                <Link to="/dashboard" className="menu-item">Home</Link>
                <Link to="/employees" className="menu-item">Employee List</Link>
            </div>
            <div className="admin-name"> {adminName}</div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default MenuBar;
