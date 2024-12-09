import React, { useState } from "react";
import "./css/Settings.css";

// Simple setting page
function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <ul>
          
          <li onClick={() => setActiveTab("account")}>Account</li>
          <li onClick={() => setActiveTab("notifications")}>Notifications</li>
          <li onClick={() => setActiveTab("connected")}>Connected Devices</li>
          <li onClick={() => setActiveTab("privacy")}>Language</li>
          <li onClick={() => setActiveTab("access")}>Accessibility</li>
          <li onClick={() => setActiveTab("help")}>Help</li>
        </ul>
      </div>
      <div className="settings-content">
        {activeTab === "notifications" && (
          <div>
            <h3>Notifications Settings</h3>
            <p>Here you can update your notifications information.</p>
            {/* Add form for profile updates */}
          </div>
        )}
        {activeTab === "account" && (
          <div>
            <h3>Account Settings</h3>
            <p>Manage your account settings here.</p>
            {/* Add form for account settings */}
          </div>
        )}
        {activeTab === "connected" && (
          <div>
            <h3>Connected Devices</h3>
            <p>Manage your connected devices here.</p>
            {/* Add options for preferences */}
          </div>
        )}
        {activeTab === "privacy" && (
          <div>
            <h3>Language Settings</h3>
            <p>Manage your language settings here.</p>
            {/* Add privacy-related settings */}
          </div>
        )}
        {activeTab === "access" && (
          <div>
            <h3>Accessibility Settings</h3>
            <p>Manage your accessibility settings here.</p>
            {/* Add privacy-related settings */}
          </div>
        )}
        {activeTab === "help" && (
          <div>
            <h3>Help page</h3>
            <p>Help page with useful links</p>
            {/* Add privacy-related settings */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;