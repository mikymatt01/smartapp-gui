import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { lineChartData } from "./Data.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
export const LineGraph = () => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (<div style={{ position: 'relative', height: '40vh', width: '50vw' }}>
        <h1>Machines Dashboard</h1>
        <Line data={lineChartData} options={options} />
    </div>)
    // <Line options={options} data={lineChartData} />;
};
