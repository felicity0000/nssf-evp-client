// LineGraph.tsx

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";  // Import Line chart from react-chartjs-2
import * as apiClient from "../api-client";  // Your API client for fetching data

// Import Chart.js components and register necessary elements
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register the components with Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

interface LineGraphData {
  date: string;
  count: number;
}

const LineGraph: React.FC = () => {
  const [chartData, setChartData] = useState<LineGraphData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLineGraphData = async () => {
      try {
        const response = await apiClient.fetchLineGraph();
        setChartData(response.data);
      } catch (err) {
        setError("Failed to load line graph data");
      } finally {
        setLoading(false);
      }
    };

    loadLineGraphData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const data = {
    labels: chartData?.map(item => item.date) || [],
    datasets: [
      {
        label: "Feedback Count",
        data: chartData?.map(item => item.count) || [],
        fill: false,
        borderColor: "#4BC0C0",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="h-[300px]"> {/* Control the height */}
      <h2 className="text-center">Line Graph of Feedback Counts Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default LineGraph;
