// PieChart.tsx

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import * as apiClient from "../api-client";  // Your API client for fetching data

// Import Chart.js components and register necessary elements
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register the components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

interface FeedbackData {
  department: string;
  count: number;
}

const PieChart: React.FC = () => {
  const [chartData, setChartData] = useState<FeedbackData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPieChartData = async () => {
      try {
        const response = await apiClient.fetchPieChart();
        setChartData(response.data);
      } catch (err) {
        setError("Failed to load pie chart data");
      } finally {
        setLoading(false);
      }
    };

    loadPieChartData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const data = {
    labels: chartData?.map(item => item.department) || [],
    datasets: [
      {
        data: chartData?.map(item => item.count) || [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#FFB6C1"],
        hoverBackgroundColor: ["#FF4384", "#3A9DEB", "#FF9F56", "#39D9D9", "#FF7F30", "#FF8CB2"],
      },
    ],
  };

  return (
    <div className="h-[300px]"> {/* Control the height */}
      <h2 className="text-center">Pie Chart of Feedbacks by Department</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
