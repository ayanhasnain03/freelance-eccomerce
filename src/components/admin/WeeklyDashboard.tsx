import { useEffect, useState } from "react";
import UniversalChart from "./charts/UniversalChart";
import { useGetWeekDashboardQuery } from "../../redux/api/dashboard";
import Skeleton from "../shared/Skeleton";

const WeeklyDashboard = () => {
  const { data, error, isLoading } = useGetWeekDashboardQuery("");

  const [chartData, setChartData] = useState({
    orderWeekCounts: [],
    lastWeekRevenueCounts: [],
  });

  useEffect(() => {
    if (data) {
      setChartData(data.stats);
    }
  }, [data]);

  if (isLoading) {
    return <Skeleton quantity={4} />;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error loading data</div>;
  }

  const orderLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const revenueLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const orderOptions = {
    title: 'Orders per Day',
    unit: 'Orders',
    label: "Orders"
  };

  const orderColors = {
    backgroundColor: 'rgba(54, 162, 235, 0.5)',  
    borderColor: 'rgba(54, 162, 235, 1)',       
    hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',  
    hoverBorderColor: 'rgba(54, 162, 235, 1)',  
  };

 
  const revenueOptions = {
    title: 'Revenue per Day',
    unit: '₹',
    label: "Revenue"
  };

  const revenueColors = {
    backgroundColor: 'rgba(255, 159, 64, 0.5)',  
    borderColor: 'rgba(255, 159, 64, 1)',       
    hoverBackgroundColor: 'rgba(255, 159, 64, 0.7)', 
    hoverBorderColor: 'rgba(255, 159, 64, 1)',  
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Weekly Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        
        {/* Orders Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <h3 className="text-lg font-medium text-center text-gray-800 mb-4">Orders per Day</h3>
          <UniversalChart
            type="bar"
            data={chartData.orderWeekCounts}
            labels={orderLabels}
            options={orderOptions}
            colors={orderColors} 
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <h3 className="text-lg font-medium text-center text-gray-800 mb-4">Revenue per Day</h3>
          <UniversalChart
            type="bar"
            data={chartData.lastWeekRevenueCounts}
            labels={revenueLabels}
            options={revenueOptions}
            colors={revenueColors}  
          />
        </div>

      </div>
    </div>
  );
};

export default WeeklyDashboard;
