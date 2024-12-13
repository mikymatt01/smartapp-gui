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

// Component used to render a graph based on user input

export default function LineGraphFiltered({ chartData, startDate, endDate, increment }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (chartData && startDate && endDate) {
      var labels = generateDateRange(startDate, endDate, increment);
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
  }, [startDate, endDate, chartData, increment]);

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

// Function to get an array of dates to use as labels for the x-axis
function generateDateRange(startDate, endDate, increment) {
  const dateList = [];
  const currentDate = new Date(startDate);
  const finalDate = new Date(endDate);

  // Verifies the dates
  if (isNaN(currentDate.getTime()) || isNaN(finalDate.getTime())) {
    throw new Error("Le date fornite non sono valide.");
  }

  // Generates the list of dates based on granularity
  if(increment == 1){
    while (currentDate <= finalDate) {
      dateList.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1); // One day increment
    }
  } else if(increment == 7){
    while (currentDate <= finalDate) {
      dateList.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 7); // One day increment
    }
  } else if(increment == 30){
    while (currentDate <= finalDate) {
      dateList.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 30); // One day increment
    }
  }

  return dateList;
}
