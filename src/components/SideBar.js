import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import { smoRoutes, ffmRoutes } from '../consts'
import { AuthContext } from "../hooks/user"
import LogoutIcon from "@mui/icons-material/Logout";

// This is the sidebar of the site
// If it's a FFM there will be displayed: dashboard, machines, reports, settings, logout
// If it's a SMO : dashboard sites, reports, settings, logout
// The choice is again based on the fact if the field site is null 

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
