import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
// Create the context
const AppContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const queryClient = useQueryClient();
    
    const { isError, isLoading } = useQuery("validateToken", async () => {
        const response = await fetch(`http://localhost:7000/api/validate-token`, {
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Token invalid");
        }

        const result = await response.json();
        return result;
    }, {
        retry: false,
    });

    const isLoggedIn = !isLoading && !isError;

    // Logout function to clear the session and update state
    const logout = async () => {
        try {
            await fetch("http://localhost:7000/api/logout", {
                method: "POST",
                credentials: "include"
            });
            // Invalidate the token query to update the `isLoggedIn` state
            queryClient.invalidateQueries("validateToken");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const {admin } =useQuery("getAdmin", async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/admin', {
                withCredentials: true,
            });
            if(!response){
                throw new Error("not found")
            }
            return response.data.fullName;
        } catch (error) {
            console.error('Error fetching admin name:', error);
        }
    }, {
        retry: false
    })

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                logout, // Provide the logout function,
                admin 
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the app context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
