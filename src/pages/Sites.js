import React, { useState, useEffect } from "react";
import "./css/Sites.css";
import KPI from "../components/KPIs";

// This is a page that only the SMO has access to.
// The sites pages allow the user to see in details the different sites

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
    <div className="sites-page d-flex flex-column overflow-scroll w-100 m-4">
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
              disabled={site.id != 1}
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
          <KPI />
        </div>
      )}
    </div>
  );
};

export default SitesPage;
