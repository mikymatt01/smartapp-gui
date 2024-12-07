import React, { useState } from "react";
import "./Topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";

function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    "Allert #1",
    "Allert #2",
    "Allert #3",
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="topbar">
      <div className="search-container">
        <input type="text" placeholder="Search" />
        <SearchIcon className="search-icon" />
      </div>
      <div className="topbar-right">
        <div className="notification-wrapper">
          <NotificationsIcon
            className="notification-icon"
            onClick={toggleNotifications}
          />
          {showNotifications && (
            <div className="notification-dropdown">
              {notifications.length > 0 ? (
                notifications.map((message, index) => (
                  <div key={index} className="notification-item">
                    {message}
                  </div>
                ))
              ) : (
                <div className="notification-item">No new notifications</div>
              )}
            </div>
          )}
        </div>
        <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
      </div>
    </div>
  );
}

export default Topbar;
