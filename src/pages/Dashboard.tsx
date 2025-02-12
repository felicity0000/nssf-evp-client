import FeedbackStats from '../components/FeedbackStats';
import LineGraph from '../components/LineGraph';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Cards for Feedback Stats in a straight line and centered */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <div className="w-full sm:w-1/4 p-4">
          <FeedbackStats />
        </div>
      </div>

      {/* Graphs displayed below the stats, centered */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
          <LineGraph />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
