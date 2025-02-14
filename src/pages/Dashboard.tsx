import React from 'react';
import FeedbackStats from '../components/FeedbackStats';
import LineGraph from '../components/LineGraph';
import PieChart from '../components/PieChart';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        {/* Feedback Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FeedbackStats />
        </div>
        
        {/* Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <LineGraph />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;