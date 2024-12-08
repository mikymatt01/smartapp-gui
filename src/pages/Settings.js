import React, { useState } from "react";
import "./css/Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <ul>
          <li onClick={() => setActiveTab("profile")}>Profile</li>
          <li onClick={() => setActiveTab("account")}>Account</li>
          <li onClick={() => setActiveTab("preferences")}>Preferences</li>
          <li onClick={() => setActiveTab("privacy")}>Privacy</li>
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
        {activeTab === "account" && (
          <div>
            <h3>Account Settings</h3>
            <p>Manage your account settings here.</p>
            {/* Add form for account settings */}
          </div>
        )}
        {activeTab === "preferences" && (
          <div>
            <h3>Preferences</h3>
            <p>Customize your app experience here.</p>
            {/* Add options for preferences */}
          </div>
        )}
        {activeTab === "privacy" && (
          <div>
            <h3>Privacy Settings</h3>
            <p>Manage your privacy settings here.</p>
            {/* Add privacy-related settings */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;