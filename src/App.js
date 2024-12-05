import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Dashboard from './pages/Dashboard';
import MachineDashboard from './pages/Machines';
import Production from './pages/Production';
import KPI from './pages/KPIs';
import Report from './pages/Report';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import CreateReport from './pages/CreateReport';



import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <SideBar />
        <div className="homeContainer">
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/machines" element={<MachineDashboard />} />
              <Route path="/production" element={<Production />} />
              <Route path="/kpi" element={<KPI />} />
              <Route path="/report" element={<Report />} />
              <Route path="/report/createreport" element={<CreateReport />} /> 
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/status" element={<h1>Status</h1>} />
              <Route path="/alarms" element={<h1>Alarms</h1>} />
              <Route path="/theme" element={<h1>Theme</h1>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<h1>Logout</h1>} />

            </Routes>
          </div>
        </div>


      </div>
    </Router>
  );
};

export default App;
