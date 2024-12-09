import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

// Register the components with Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function LineGraphFiltered({ chartData, startDate, endDate }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (chartData && startDate && endDate) {
      var labels = generateDateRange(startDate, endDate);
      var label = "value";
      if (labels) {
        var newData = {
          labels: labels, // x-axis labels
          datasets: [
            {
              label: label,
              data: chartData, // Set the fetched data as datasets
              borderColor: "#3e95cd", // Custom border color
              fill: false,
            },
          ],
        };
        setData(newData);
      }
    }
  }, [chartData]);

  return (
    <div
      className="line-graph mb-3 pb-4"
      style={{ position: "relative", height: "40vh", width: "100%" }}
    >
      <h2> Generated graph </h2>
      {data && <Line data={data} />}
    </div>
  );
}

function generateDateRange(startDate, endDate) {
  const dateList = [];
  const currentDate = new Date(startDate);
  const finalDate = new Date(endDate);

  // Verifica validità delle date
  if (isNaN(currentDate.getTime()) || isNaN(finalDate.getTime())) {
    throw new Error("Le date fornite non sono valide.");
  }

  // Genera la lista di date
  while (currentDate <= finalDate) {
    dateList.push(currentDate.toISOString().split("T")[0]); // Formato YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1); // Incremento di un giorno
  }

  return dateList;
}
