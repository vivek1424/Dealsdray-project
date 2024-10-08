import React from 'react';
import '../styles/Header.css'; // Optional: Import CSS for additional styling
import MenuBar from './Menubar';
import { useAppContext } from '../contexts/ContextAPI';
import '../styles/Header.css'

const Header = () => {
    const {isLoggedIn}= useAppContext();
    console.log(isLoggedIn);
    
    return (
        <>
            <img
                src="https://t3.ftcdn.net/jpg/05/67/74/88/360_F_567748875_IpZmOy1dWLTY0ni0J7KQLrWg9hBHCs15.jpg" // Replace with the path to your logo image
                alt="Company Logo"
                className="logo"
            />
            {
                isLoggedIn && <MenuBar/>
            }
            
        </>


    );
};

export default Header;
