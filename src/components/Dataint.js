import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export const LineChartData = () => {
    const [chartData, setChartData] = useState();
    const [labels, setlables] = useState();
    const [datasets, setDataset] = useState();

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const labelsResponse = await fetch("http://localhost:3000/labels");
                const datasetsResponse = await fetch("http://localhost:3000/datasets");

                const labelsData = await labelsResponse.json();
                const datasetsData = await datasetsResponse.json();

                const labels = labelsData.map((label) => label.day);
                const datasets = datasetsData.map((dataset) => ({
                    label: dataset.label,
                    data: dataset.data,
                    borderColor: dataset.label === "His Steps" ? "rgb(75, 192, 192)" : "green",

                }

                ));

                setlables(labels);
                setDataset(datasets);
                console.log(datasets);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchChartData();
    }, []);
    // if (!chartData) return <p>Loading...</p>;
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };
    return <Line data={{ labels, datasets }} options={options} />;
};
