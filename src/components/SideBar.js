import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <span className="logo">FFM</span>
            </div>
            <div className="sidebar-wrapper">
                <ul className="sidebar-menu">
                    <li className="menu-category">MAIN</li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/machines">Machines</Link></li>
                    <li className="menu-category">INVENTORY</li>
                    <li><Link to="/production">Production</Link></li>
                    <li><Link to="/kpi">KPI</Link></li>
                    <li><Link to="/report">Report</Link></li>
                    <li className="menu-category">UPDATES</li>
                    <li><Link to="/notifications">Notifications</Link></li>
                    <li><Link to="/status">Status</Link></li>
                    <li><Link to="/alarms">Alarms</Link></li>
                    <li className="menu-category">SERVICE</li>
                    <li><Link to="/theme">Theme</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
