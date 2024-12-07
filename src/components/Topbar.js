import React from "react";
import "./Topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";

function Topbar() {
  return (
    <div className="topbar">
      <div className="search-container">
        <input type="text" placeholder="Search" />
        <SearchIcon className="search-icon" />
      </div>
      <div className="topbar-right">
        <NotificationsIcon className="notification-icon" />
        <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
      </div>
    </div>
  );
}

export default Topbar;
