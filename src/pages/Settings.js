import React, { useState } from "react";

import "./Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <ul>
          <li onClick={() => setActiveTab("profile")}>Profile</li>
          <li onClick={() => setActiveTab("notifications")}>Notifications</li>
          <li onClick={() => setActiveTab("devices")}>Connected Devices</li>
          <li onClick={() => setActiveTab("language")}>Languge</li>
          <li onClick={() => setActiveTab("accessibility")}>Accessibility</li>
          <li onClick={() => setActiveTab("help")}>Help</li>
        </ul>
      </div>
      <div className="settings-content">
        {activeTab === "profile" && (
          <div>
            <h3>Profile Settings</h3>
            <p>Here you can update your profile information.</p>
            {/* Add form for profile updates */}
          </div>
        )}
        {activeTab === "notifications" && (
          <div>
            <h3>Notifications Settings</h3>
            <p>Manage your notifications settings here.</p>
            {/* Add form for account settings */}
          </div>
        )}
        {activeTab === "devices" && (
          <div>
            <h3>Connected Devices:</h3>
            <p>Customize your app experience here.</p>
            {/* Add options for preferences */}
          </div>
        )}
        {activeTab === "language" && (
          <div>
            <h3>Language</h3>
            <p>Manage your language settings here.</p>
            {/* Add privacy-related settings */}
          </div>
        )}
        {activeTab === "accessibility" && (
          <div>
            <h3>Accessibility Settings</h3>
            <p>Manage your accessibility settings here.</p>
            {/* Add privacy-related settings */}
          </div>
        )}
        {activeTab === "help" && (
          <div>
            <h3>Help</h3>
            <p>Get contact info here.</p>
            {/* Add privacy-related settings */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
