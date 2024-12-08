import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./pages/css/App.css";
import { AuthContext } from "./hooks/user"
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import MyRoutes from "./components/Routes";

const baseUrl = 'http://127.0.0.1:8000/api/v1.0'

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const contextValue = useMemo(() => currentUser, [currentUser]);

  // Retrieve token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);

  useEffect(() => {
    async function getUser() {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const response = await fetch(`${baseUrl}/user`, requestOptions)
      setCurrentUser((await response.json()).data)
    }
    getUser()
  }, [token])

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
                  <MyRoutes setToken={setToken} />
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
