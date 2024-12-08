import React from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BuildIcon from "@mui/icons-material/Build";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">SMO Dash</h2>
      <ul className="sidebar-links">
        <li>
          <Link to="/">
            <DashboardIcon className="sidebar-icon" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/sites">
            <LocationOnIcon className="sidebar-icon" />
            Sites
          </Link>
        </li>
        <li>
          <Link to="/machines">
            <BuildIcon className="sidebar-icon" />
            Machines
          </Link>
        </li>
        <li>
          <Link to="/report">
            <HistoryIcon className="sidebar-icon" />
            Report
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <SettingsIcon className="sidebar-icon" />
            Settings
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <LogoutIcon className="sidebar-icon" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
