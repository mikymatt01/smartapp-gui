import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Sites from "./pages/Sites";
import Machines from "./pages/Machines";
import ReportHistory from "./pages/ReportHistory";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";

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
              <Route path="/report-history" element={<ReportHistory />} />
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
