import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Sites from "./pages/Sites";
import Machines from "./pages/Machines";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import CreateReport from "./pages/CreateReport";
import Login from "./pages/Login"; // Assuming the Login component is under 'pages'
import "./pages/css/App.css";

function App() {
  const [token, setToken] = useState(null); // State to manage authentication token

  // Retrieve token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    /*
    const getAPI = () => {
      if (!token) {
        setError("You must log in first to fetch KPIs.");
        return;
      }

      Axios.get("https://api-656930476914.europe-west1.run.app/api/v1.0/kpi/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setKpiData(response.data);
          setError(null);
        })
        .catch((error) => {
          setError("Failed to fetch KPIs. Please try again later.");
        });
    };

    getAPI();*/
  }, [token]);

  return (
    <Router>
      <div className="app">
        {token ? (
          <>
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
                  <Route path="/logout" element={<Logout setToken={setToken} />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Login setToken={setToken} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
