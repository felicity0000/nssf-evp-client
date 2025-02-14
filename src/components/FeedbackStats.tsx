import React, { useEffect, useState } from "react";
import * as apiClient from "../api-client";

interface StatsData {
  total: number;
  Pending: number;
  Resolved: number;
  "In Progress": number;
}

const FeedbackStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeedbackStats = async () => {
      try {
        const response = await apiClient.fetchFeedbackStats();
        setStats(response.data);
      } catch (err) {
        setError("Failed to load feedback stats");
      } finally {
        setLoading(false);
      }
    };

    loadFeedbackStats();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
      {error}
    </div>
  );

  const statCards = [
    { title: "Total Feedbacks", value: stats?.total, color: "bg-blue-500" },
    { title: "Pending", value: stats?.Pending, color: "bg-yellow-500" },
    { title: "Resolved", value: stats?.Resolved, color: "bg-green-500" },
    { title: "In Progress", value: stats?.["In Progress"], color: "bg-purple-500" },
  ];

  return (
    <>
      {statCards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className={`${card.color} h-2`}></div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{card.value || 0}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedbackStats;