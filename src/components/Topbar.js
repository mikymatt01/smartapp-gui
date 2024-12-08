import React, { useState, useContext } from "react";
import "./css/Topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../hooks/user"
import UserThumbnail from "./UserThumbnail";

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

  const auth = useContext(AuthContext)
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
          <UserThumbnail
            email={auth.email}
            name={auth.first_name}
            surname={auth.last_name}
          />
      </div>
    </div>
  );
}

export default Topbar;
