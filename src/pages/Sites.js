import React, { useState, useEffect } from "react";
import "./Sites.css";
import { Chatbot } from '../components/Chatbot'


const SitesPage = () => {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    // Fetch the sites data from JSON file
    fetch("./Sitesdata.json")
      .then((response) => response.json())
      .then((data) => setSites(data))
      .catch((error) => console.error("Error fetching site data:", error));
  }, []);

  const selectSite = (site) => {
    setSelectedSite(site);
  };

  return (
    <div className="sites-page">
      <h1 className="page-title">Manufacturing Sites</h1>
      <div className="sites-grid">
        {sites.map((site) => (
          <div className="site-card no-border" key={site.id}>
            <h2 className="site-name">{site.name}</h2>
            <p className="site-location">{site.location}</p>
            <p className="ffm-details">
              <strong>FFM:</strong> {site.ffm}
            </p>
            <p className="stats">
              <strong>Total Machines:</strong> {site.machines}
            </p>
            <p className="stats alerts">
              <strong>Alerts:</strong> {site.alerts}
            </p>
            <p className="last-maintenance">
              <strong>Last Maintenance:</strong> {site.lastMaintenance}
            </p>
            <button
              className="view-details-btn"
              onClick={() => selectSite(site)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedSite && (
        <div className="site-detail">
          <button className="close-btn" onClick={() => setSelectedSite(null)}>
            Close
          </button>
          <h2>{selectedSite.name} - Details</h2>
          <p>
            <strong>Location:</strong> {selectedSite.location}
          </p>
          <p>
            <strong>Factory Floor Manager:</strong> {selectedSite.ffm} (
            <a href={`mailto:${selectedSite.ffmContact}`}>
              {selectedSite.ffmContact}
            </a>
            )
          </p>
          <p>
            <strong>Total Machines:</strong> {selectedSite.machines}
          </p>
          <p>
            <strong>Machines Under Alert:</strong> {selectedSite.alerts}
          </p>
          <h3>Alerts Details:</h3>
          <ul>
            {selectedSite.alertsDetails.map((alert, index) => (
              <li key={index}>
                <strong>Machine {alert.machineId}:</strong> {alert.issue} (
                <span className={`severity ${alert.severity.toLowerCase()}`}>
                  {alert.severity}
                </span>
                )
              </li>
            ))}
          </ul>
        </div>
      )}
<Chatbot />
    </div>
  );
};

export default SitesPage;
