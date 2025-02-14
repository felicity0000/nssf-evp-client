// PieChart.tsx
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import * as apiClient from "../api-client";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

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

  if (loading) return <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Feedbacks by Department',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="h-80">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;