import React, { useState, useEffect } from "react";
//import { FaDownload } from "react-icons/fa";
import "./CreateReport.css"; 

const CreateReport = () => {
  const [language, setLanguage] = useState("language"); // State for language
  const [frequency, setFrequency] = useState("frequency"); // State for frequency
  const [name, setName] = useState(""); // State for report name
  const [selectedKPIs, setSelectedKPIs] = useState([]); // State for selected KPIs
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error messages
  const [kpis, setKpis] = useState([]); // State for KPIs options to show to user

  // Fetch KPIs data from API
  useEffect(() => {
    const fetchKPIs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://api.example.com/kpis"); // Replace with actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch KPIs");
        }

        const data = await response.json();
        setKpis(data.kpis); // Assuming the API response has a 'kpis' array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  // Handle name input change
  const handleNameChange = (newName) => {
    setName(newName);
  };

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Handle frequency change
  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
  };

  // Handle KPIs selection change (multi-select)
  const handleKPIChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedKPIs(selectedValues);
  };

  // Handle download button click
  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.example.com/"); // Replace with actual API URL

      if (!response.ok) {
        throw new Error("Failed to fetch the download link");
      }

      const data = await response.json();

      if (data?.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl; // Assuming downloadUrl is the field in the API response
        link.download = name || "report"; // If user doesn't provide a name, default to report
        link.click();
      } else {
        throw new Error("Download link not available");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-report-container">
      {/* Name Input */}
      <div className="name-input-container">
        <label htmlFor="report-name" className="name-label">
          Name
        </label>
        <input
          id="report-name"
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Enter report name"
          className="name-input"
        />
      </div>

      {/* Language Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="language" className="dropdown-label">
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="dropdown-select"
        >
          <option value="" disabled>
            Select Language
          </option>
          <option value="ita">Italian</option>
          <option value="eng">English</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Frequency Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="frequency" className="dropdown-label">
          Frequency
        </label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => handleFrequencyChange(e.target.value)}
          className="dropdown-select"
        >
          <option value="" disabled>
            Select Frequency
          </option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Select KPIs Dropdown (Multi-choice) */}
      <div className="dropdown-container">
        <label htmlFor="kpis" className="dropdown-label">
          Select KPIs
        </label>
        <select
          id="kpis"
          multiple
          value={selectedKPIs}
          onChange={handleKPIChange}
          className="dropdown-select"
        >
          {loading && <option>Loading KPIs...</option>} {/* Loading state */}
          {error && <option>Error loading KPIs</option>} {/* Error state */}
          {!loading && !error && kpis.length === 0 && (
            <option>No KPIs available</option>
          )}

          {/* Render KPIs dynamically */}
          {!loading && !error && kpis.map((kpi) => (
            <option key={kpi.id} value={kpi.id}>
              {kpi.name}
            </option>
          ))}
        </select>
      </div>

      {/* Download Button */}
      <div className="button-container">
        <button onClick={handleDownload} disabled={loading} className="generate-report-button">
            {/*<FaDownload className="download-icon" /> {/* Download icon */}
            {loading ? "Generating..." : "Generate Report"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CreateReport;