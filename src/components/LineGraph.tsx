// LineGraph.tsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import * as apiClient from "../api-client";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

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

  if (loading) return <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const data = {
    labels: chartData?.map(item => item.date) || [],
    datasets: [
      {
        label: "Feedback Count",
        data: chartData?.map(item => item.count) || [],
        fill: false,
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Feedback Counts Over Time',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="h-80">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;