import React from "react";
import { FaRegBell } from "react-icons/fa";

// Page title
const PageTitle = ({ title, showPlusButton, showCreateButton, onPlusClick, onCreateClick, onBellClick }) => (
  <div className="page-title-container">
    <h1>{title}</h1>
    {showPlusButton && (
      <button className="plus-button" onClick={onPlusClick}>
        + Add
      </button>
    )}
    {showCreateButton && (
      <button className="create-button" onClick={onCreateClick}>
        + Create new KPI
      </button>
    )}
    <button className="bell-button" onClick={onBellClick}>
      <FaRegBell size={24} /> {/* FaRegBell icon */}
    </button>
  </div>
);

export default PageTitle;