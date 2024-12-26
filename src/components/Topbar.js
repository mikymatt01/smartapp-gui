import React, { useState, useContext, useRef, useEffect } from "react";
import "./css/Topbar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../hooks/user";
import UserThumbnail from "./UserThumbnail";
import ChangeTranslation from "./changeTranslation";
import { Badge } from "@mui/material";
import { format } from 'date-fns';
import { setNotificationsAsSeen } from "../sdk";

function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const ref = useRef(null)

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    console.log("notifications: ", showNotifications)
    if (showNotifications) {
      setNotificationsAsSeen()
        .then((result) => setNotifications(result.data))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNotifications])

  useEffect(() => {
      const fetchNotifications = async () => {
        const storedToken = localStorage.getItem("token");
  
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${storedToken}`);
  
          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
  
          const response = await fetch(
            `http://127.0.0.1:8000/api/v1.0/notification`,
            requestOptions
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Notifications");
          }
  
          const data = await response.json();
          setNotifications(data.data);
        } catch (err) {
        } finally {
        }
      };
  
      fetchNotifications();
  }, []);
  
  const auth = useContext(AuthContext);
  return (
    <div className="topbar w-100  px-3">
      <div className="ms-auto d-flex align-items-center gap-2 ">
        <ChangeTranslation
          className="notification-icon"
          show={showTranslation}
          setShow={setShowTranslation}
        />
        <div className="notification-wrapper">
          {notifications.filter((notification) => !notification.seen).length > 0 ? (
            <Badge badgeContent={' '} color="primary">
              <NotificationsIcon
                className="notification-icon"
                onClick={toggleNotifications}
                ref={ref}
                />
            </Badge>
          ) : (
              <NotificationsIcon
              className="notification-icon"
              onClick={toggleNotifications}
              ref={ref}
              />
          )}
          <div className="notification-dropdown" hidden={!showNotifications}>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => {
                return (
                  <div key={index} className="notification-item">
                    <b>{notification.title}</b>
                    <p>{notification.message}</p>
                    <p style={{ fontSize: '10px', color: 'grey', }}>{format(notification.created_at, 'dd-MM-yyyy HH:mm')}</p>
                  </div>
                )
              })
            ) : (
              <div className="notification-item">No new notifications</div>
            )}
          </div>
        </div>
        {auth ? (
          <UserThumbnail
            email={auth.email}
            name={auth.first_name}
            surname={auth.last_name}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Topbar;
