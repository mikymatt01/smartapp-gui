import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import { smoRoutes, ffmRoutes } from '../consts'
import { AuthContext } from "../hooks/user"
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  const auth = useContext(AuthContext)
  return (
    <div className="sidebar">
      <h2 className="logo">Dash</h2>
      <ul className="sidebar-links">
        {
          auth ? (
          (auth.site === null ? smoRoutes : ffmRoutes).map((route) => (
            <li key={route.title}>
              <Link key={route.title} to={route.url}>
                {route.icon}
                {route.title}
              </Link>
            </li>
          ))
          ) : (
              <Link to={'/logout'}>
                <LogoutIcon className="sidebar-icon" />
                Logout
              </Link>
        )
        }
      </ul>
    </div>
  );
}

export default Sidebar;
