import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Sites from "./pages/Sites";
import Machines from "./pages/Machines";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import CreateReport from "./pages/CreateReport";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Topbar />
          <div className="home-container">

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/machines" element={<Machines />} />
              <Route path="/report" element={<Report />} />
              <Route path="/report/createreport" element={<CreateReport />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
