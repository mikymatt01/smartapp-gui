import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the components with Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// This file allows to call the api to create a line graph based on a week data of all the machines
// divided in categories, it's hard coded to show the ones we know from the site we have

export const LineGraph = ({ site, title }) => {
    const [error, setError] = useState(null); // State for error
    const [chartData, setChartData] = useState(null); // State for chart data
    // Color mapping for each machine category
    const colorMapping = {
        "Metal cutter": "#8e5ea2",  // Purple
        "Laser Welder": "#3e95cd",  // Blue
        "Assembler": "#3cba9f",     // Green
        "Tester": "#e8c3b9",        // Beige
        "Rivetter": "#c45850",      // Red
        "Laser Cutter": "#ffcc00",  // Yellow
    };
    
    useEffect(() => {
        const machine_category = ["Metal cutter", "Laser Welder", "Assembler", "Tester", "Rivetter", "Laser Cutter"];
        
        const fetchValues = async (category) => {
            setError(null); // Clear previous errors
            const storedToken = localStorage.getItem("token");

            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${storedToken}`);

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                };

                const response = await fetch(
                    `https://api-656930476914.europe-west1.run.app/api/v1.0/kpi/site/${site}/compute?kpi_id=673a6ad2d9e0b151b88cbed0&start_date=2024-10-08%2000%3A00%3A00&end_date=2024-10-14%2000%3A00%3A00&granularity_op=avg&granularity_days=1&category=${category}`,
                    requestOptions
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                const values = Array.isArray(data.data) ? data.data.map((item) => item.value) : [];

                // Return the formatted result
                return {
                    label: category,
                    data: values,
                    borderColor: colorMapping[category], // Custom border color
                    fill: false // Disable filling under the line
                };
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAllValues = async () => {
            try {
                // Fetch all values for each category and wait for all of them
                const allValues = await Promise.all(
                    machine_category.map((category) => fetchValues(category))
                );
                
                // Format the data for the chart
                const data = {
                    labels: ["24-10-08", "24-10-09", "24-10-10", "24-10-11", "24-10-12", "24-10-13", "24-10-14"], // x-axis labels
                    datasets: allValues // Set the fetched data as datasets
                };

                // Set the chart data after fetching all the values
                setChartData(data);
            } catch (err) {
                setError("An error occurred while fetching values.");
            }
        };
        
        fetchAllValues();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Default options for the chart
    const options = {
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    if (!chartData) {
        return <p>Loading...</p>; // Show a loading message while data is being fetched
    }

    return (
        <div className="line-graph" style={{ position: "relative", width: "100%" }}>
            <h2>{title}</h2>
            <Line data={chartData} options={options} />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};
