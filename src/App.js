import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./pages/css/App.css";
import { AuthContext } from "./hooks/user";
import Sidebar from "./components/SideBar";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import MyRoutes from "./components/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { TranslationProvider } from "./hooks/translation";
import { DataProvider } from "./hooks/data";
import { fetchUserSDK } from "./sdk";

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const contextValue = useMemo(() => currentUser, [currentUser]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);

  useEffect(() => {
    async function getUser() {
      try {
        const result = await fetchUserSDK()
        setCurrentUser(result.data);
      } catch (e) {}
    }
    getUser();
  }, [token]);

  return (
    <DataProvider>
      <TranslationProvider>
        <AuthContext.Provider value={contextValue}>
          <Router>
            <div className="app d-flex overflow-hidden flex-shrink-0">
              {token ? (
                <div className="d-flex w-100 flex-shrink-0 overflow-hidden">
                  <div className="d-flex">
                    <Sidebar />
                  </div>
                  <div className="content overflow-hidden flex-1">
                    <Topbar />
                    <div className="home-container w-100 h-100 pb-4">
                      <MyRoutes setToken={setToken} />
                    </div>
                  </div>
                </div>
              ) : (
                <Routes>
                  <Route path="*" element={<Login setToken={setToken} />} />
                </Routes>
              )}
            </div>
          </Router>
          </AuthContext.Provider>
        </TranslationProvider>
      </DataProvider>
  );
}

export default App;
