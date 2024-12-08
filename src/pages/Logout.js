import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";

const Logout = ({ setToken }) => {
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Clear the token when logging out
        setToken(null); // Reset the token in the App state

        // Optionally, clear from localStorage if you're using it
        localStorage.removeItem("token");

        // Redirect to the login page after logging out
        navigate("/"); // This will navigate to the login page ("/")
    }, [setToken, navigate]);

    return (
        <div>
            <PageTitle title="Logout" />
            <p>Logging you out...</p>
        </div>
    );
};

export default Logout;
