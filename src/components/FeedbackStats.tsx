import React, { useEffect, useState } from "react";
import * as apiClient from "../api-client";  // Your API client for fetching data

const FeedbackStats: React.FC = () => {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeedbackStats = async () => {
      try {
        const response = await apiClient.fetchFeedbackStats();
        setStats(response.data);  // Assuming response.data contains the stats
      } catch (err) {
        setError("Failed to load feedback stats");
      } finally {
        setLoading(false);
      }
    };

    loadFeedbackStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex gap-6 p-6 justify-center">
      {/* Card 1 - Total Feedbacks */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">Total Feedbacks</h3>
        <p className="text-xl font-bold">{stats?.total}</p>
      </div>

      {/* Card 2 - Pending */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">Pending</h3>
        <p className="text-xl font-bold">{stats?.Pending}</p>
      </div>

      {/* Card 3 - Resolved */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full flex flex-col items-center justify-between">
        <h3 className="text-lg font-semibold">Resolved</h3>
        <p className="text-xl font-bold">{stats?.Resolved}</p>
      </div>

      {/* Card 4 - In Progress */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full flex flex-col items-center justify-between">
        <h3 className="text-lg font-semibold">In Progress</h3>
        <p className="text-xl font-bold">{stats?.["In Progress"]}</p>
      </div>
    </div>
  );
};

export default FeedbackStats;
