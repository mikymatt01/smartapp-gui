import React from "react";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="wrapper">
                {/* <div className="navbar-logo"></div> */}
                <div className="navbar-search">
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="navbar-options">
                    <span className="navbar-lang">🌐 Eng</span>
                    <span className="navbar-profile">👤</span>
                    <span className="navbar-alert">🔔</span>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
