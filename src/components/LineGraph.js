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

export const LineGraph = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Fetch data from data.json
        const fetchData = async () => {
            try {
                const response = await fetch("data.json");
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched data:", data); // Log data to the console
                    setChartData(data);
                } else {
                    console.error("Failed to fetch data.json");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
        <div className="line-graph" style={{ position: "relative", height: "40vh", width: "200vw" }}>
            <Line data={chartData} options={options} />
        </div>
    );
};
