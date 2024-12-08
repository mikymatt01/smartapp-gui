import React, { useState, useEffect, useContext, useMemo } from "react";
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
import { AuthContext } from "./hooks/user"

const baseUrl = 'https://api-656930476914.europe-west1.run.app/api/v1.0'

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({site: null, email: 'smo@example.com'});
  const auth = useContext(AuthContext)

  const contextValue = useMemo(() => ({
    currentUser
  }), [currentUser]);

  // Retrieve token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log('token: ', storedToken)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    console.log('options: ', requestOptions)
    const response = fetch(baseUrl + '/user', requestOptions)
    response.then((body) => {
      console.log(body)
    })
  }, [token]);

  console.log("auth: ", auth)
  return (
    <AuthContext.Provider value={contextValue}>
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
      </AuthContext.Provider>
  );
}

export default App;
