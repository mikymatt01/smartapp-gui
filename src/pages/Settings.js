import React from 'react';
import "./Settings.css";

const Settings = () => {

    return (
        <div>
            <div className="settings-container">
                {/* Settings Label */}
                <div>
                <h1> Settings </h1></div>
                
                {/* Account Button */}
                <div className="button-container">
                    <button className="settings-button">
                        {"Account"}
                    </button>
                </div>
                {/* Notifications Button */}
                <div className="button-container">
                    <button className="settings-button">
                        {"Notifications"}
                    </button>
                </div>
                {/* Connected DevicesButton */}
                <div className="button-container">
                    <button className="settings-button">
                        {"Connected Devices"}
                    </button>
                </div>
                {/* Language Button */}
                <div className="button-container">
                    <button className="settings-button">
                        {"Language"}
                    </button>
                </div>
                {/* Accessibility Button */}
                <div className="button-container">
                    <button className="settings-button">
                        {"Accessibility"}
                    </button>
                </div>
                {/* Help button */}
                <div className="button-container">
                    <button className="settings-button">
                        {"Help"}
                    </button>
                    </div>
            </div>
        </div>
    );
}

export default Settings;
