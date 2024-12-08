import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import { smoRoutes, ffmRoutes } from '../consts'
import { AuthContext } from "../hooks/user"

function Sidebar() {
  const auth = useContext(AuthContext)
  if (!auth) return <></>
  return (
    <div className="sidebar">
      <h2 className="logo">Dash</h2>
      <ul className="sidebar-links">
        {
          (auth.site === null ? smoRoutes : ffmRoutes).map((route) => (
            <li>
              <Link to={route.url}>
                {route.icon}
                {route.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Sidebar;
