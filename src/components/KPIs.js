import React from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import "./css/KPIs.css";
import { Chatbot } from '../components/Chatbot'
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);



export const KPI = () => {
    const timeData = {
        labels: ["Working", "Idle", "Offline"],
        datasets: [
            {
                data: [8, 2, 1], // Example data in hours
                backgroundColor: ["#badb16", "#ff5722", "#800505"],
            },
        ],
    };

    const consumptionData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Consumption (kWh)",
                data: [200, 220, 210, 230, 250],
                borderColor: "#3f51b5",
                backgroundColor: "rgba(63, 81, 181, 0.2)",
                fill: true,
            },
        ],
    };

    const costData = {
        labels: ["Total", "Working", "Idle"],
        datasets: [
            {
                data: [300, 250, 70], // Example costs
                backgroundColor: ["#046987", "#badb16", "#ff5722"],
            },
        ],
    };

    const cycleData = {
        labels: ["Good Cycles", "Bad Cycles"],
        datasets: [
            {
                data: [1200, 300],
                backgroundColor: ["#badb16", "#800505"],
            },
        ],
    };

    const additionalConsumptionData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Idle Consumption (kWh)",
                data: [50, 60, 70, 65, 80],
                borderColor: "#ff5722",
                backgroundColor: "rgba(255, 87, 34, 0.2)",
                fill: true,
            },
        ],
    };

    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (value) => {
        setTabValue(value);
    };

    return (
        <div className="kpi-container">
            {/* <h1 className="kpi-header">Operational KPIs</h1> */}

            {/* Tab Buttons */}
            <div className="kpi-tabs">
                <button
                    className={`kpi-tab ${tabValue === 0 ? "active" : ""}`}
                    onClick={() => handleTabChange(0)}
                >
                    Time
                </button>
                <button
                    className={`kpi-tab ${tabValue === 1 ? "active" : ""}`}
                    onClick={() => handleTabChange(1)}
                >
                    Consumption
                </button>
                <button
                    className={`kpi-tab ${tabValue === 2 ? "active" : ""}`}
                    onClick={() => handleTabChange(2)}
                >
                    Costs
                </button>
                <button
                    className={`kpi-tab ${tabValue === 3 ? "active" : ""}`}
                    onClick={() => handleTabChange(3)}
                >
                    Cycles
                </button>
            </div>

            {/* KPI Grid */}
            <div className="kpi-grid">
                {tabValue === 0 && (
                    <>
                        <div className="kpi-card">
                            <h3>Time Distribution</h3>
                            <div style={{ position: 'relative', height: '22vh', width: '120vw' }}>
                                <Pie data={timeData} />
                            </div>
                        </div>
                        <div className="kpi-card">
                            <h3>Idle Time Trend</h3>
                            <Line data={additionalConsumptionData} />
                        </div>
                        <div className="kpi-card">
                            <h3>Offline Time Summary</h3>
                            <div style={{ position: 'relative', height: '22vh', width: '120vw' }}>
                                <Pie data={costData} />
                            </div>
                        </div>
                    </>
                )}

                {tabValue === 1 && (
                    <>
                        <div className="kpi-card">
                            <h3>Consumption Trends</h3>
                            <Line data={consumptionData} />
                        </div>
                        <div className="kpi-card">
                            <h3>Idle Consumption</h3>
                            <Line data={additionalConsumptionData} />
                        </div>
                        <div className="kpi-card">
                            <h3>Working vs Idle</h3>
                            <div style={{ position: 'relative', height: '22vh', width: '120vw' }}>
                                <Pie data={costData} />
                            </div>
                        </div>
                    </>
                )}

                {tabValue === 2 && (
                    <>
                        <div className="kpi-card">
                            <h3>Cost Breakdown</h3>
                            <div style={{ position: 'relative', height: '22vh', width: '120vw' }}>
                                <Pie data={costData} />
                            </div>
                        </div>
                        <div className="kpi-card">
                            <h3>Idle Costs</h3>
                            <Line data={additionalConsumptionData} />
                        </div>
                        <div className="kpi-card">
                            <h3>Cost Trends</h3>
                            <Line data={consumptionData} />
                        </div>
                    </>
                )}

                {tabValue === 3 && (
                    <>
                        <div className="kpi-card">
                            <h3>Cycle Distribution</h3>
                            <div style={{ position: 'relative', height: '22vh', width: '120vw' }}>
                                <Pie data={cycleData} />
                            </div>
                        </div>
                        <div className="kpi-card">
                            <h3>Good Cycles Trend</h3>
                            <Line data={consumptionData} />
                        </div>
                        <div className="kpi-card">
                            <h3>Bad Cycles Trend</h3>
                            <Line data={additionalConsumptionData} />
                        </div>
                    </>
                )}
            </div>
            <Chatbot />
        </div>
    );
};


export default KPI;
