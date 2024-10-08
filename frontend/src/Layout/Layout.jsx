import React from 'react';
import Header from '../components/Header';
import '../styles/layout.css'

const Layout = ({ children }) => {
    return (
        <div className="layout" >
            <Header />
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
