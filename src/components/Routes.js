import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sites from "../pages/Sites";
import Machines from "../pages/Machines";
import Report from "../pages/Report";
import Settings from "../pages/Settings";
import Logout from "../pages/Logout";
import CreateReport from "../pages/CreateReport";

// Page to know where the user has to be routed to 

function MyRoutes({ setToken }) {
    return (
       <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/report" element={<Report />} />
            <Route path="/report/createreport" element={<CreateReport />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout setToken={setToken} />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes> 
    )
}

export default MyRoutes