import React, { useState, useEffect }  from "react";
import { LineGraph } from '../components/LineGraph';
import { KPI } from '../components/KPIs';
import "./css/Dashboard.css";

function Dashboard() {
    const [error, setError] = useState(null); // State for error messages
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
    const [selection, setSelection] = useState(null); // State for the selected option

    const handleChoice = (choice) => {
        setSelection(choice);
        setError(null); // Reset error when a choice is made
    };

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };

    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <p>Here is your overview.</p>

            <div className="button-container">
                <button
                    onClick={toggleDropdown} // Toggle the dropdown visibility
                    className="add-button"
                >
                    Add New
                </button>

                {/* Dropdown menu */}
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <button onClick={() => handleChoice('Add Widget')}>Add Widget</button>
                        <button onClick={() => handleChoice('Add Alarm')}>Add Alarm</button>

                         {/* Show additional options based on the selection */}
                         {selection === 'Add Widget' && (
                            <div className="widget-options">
                                <button onClick={() => console.log('Add KPI')}>Select KPI</button>
                                <button onClick={() => console.log('Add Graph')}>Add Graph</button>
                                {/* Add more widget types as needed */}
                            </div>
                        )}

                        {selection === 'Add Alarm' && (
                            <div className="alarm-options">
                                <p>Select an alarm type to add:</p>
                                <button onClick={() => console.log('Add CPU Alarm')}>Add CPU Alarm</button>
                                <button onClick={() => console.log('Add Memory Alarm')}>Add Memory Alarm</button>
                                {/* Add more alarm types as needed */}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className= "linegraph-container"> 
            <LineGraph />
            </div>
            <KPI />
        </div>
    );
}

export default Dashboard;
