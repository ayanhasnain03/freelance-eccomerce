import { useEffect, useState, useMemo } from "react";
import UniversalChart from "./charts/UniversalChart";
import { useGetWeekDashboardQuery } from "../../redux/api/dashboard";
import Skeleton from "../shared/Skeleton";

interface ChartCardProps {
  title: string;
  chartData: number[];
  labels: string[];
  options: object;
  colors: object;
}

const ChartCard = ({
  title,
  chartData,
  labels,
  options,
  colors,
}: ChartCardProps) => (
  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
    <h3 className="text-xl font-bold text-center text-gray-800 mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
      {title}
    </h3>
    <div className="transition-transform duration-300 hover:scale-105">
      <UniversalChart
        type="bar"
        data={chartData}
        labels={labels}
        options={options}
        colors={colors}
      />
    </div>
  </div>
);

const getWeekLabels = () => {
  const labels = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - dayOfWeek + i);
    labels.push(date.toLocaleString('en-US', { weekday: 'short' }));
  }
  return labels;
};

const WeeklyDashboard = () => {
  const { data, error, isLoading, refetch } = useGetWeekDashboardQuery("");
  const [chartData, setChartData] = useState({
    orderWeekCounts: [],
    lastWeekRevenueCounts: [],
  });

  useEffect(() => {
    if (data) {
      refetch();
      setChartData(data.stats);
    }
  }, [data, refetch]);

  const weekLabels = getWeekLabels();

  const orderOptions = useMemo(
    () => ({
      title: "Orders per Day",
      unit: "Orders",
      label: "Orders",
      tension: 0.4,
      borderWidth: 3,
    }),
    []
  );

  const revenueOptions = useMemo(
    () => ({
      title: "Revenue per Day", 
      unit: "₹",
      label: "Revenue",
      tension: 0.4,
      borderWidth: 3,
    }),
    []
  );

  const orderColors = useMemo(
    () => ({
      backgroundColor: "rgba(99, 102, 241, 0.4)",
      borderColor: "rgba(99, 102, 241, 1)", 
      hoverBackgroundColor: "rgba(99, 102, 241, 0.6)",
      hoverBorderColor: "rgba(99, 102, 241, 1)",
    }),
    []
  );

  const revenueColors = useMemo(
    () => ({
      backgroundColor: "rgba(139, 92, 246, 0.4)",
      borderColor: "rgba(139, 92, 246, 1)",
      hoverBackgroundColor: "rgba(139, 92, 246, 0.6)", 
      hoverBorderColor: "rgba(139, 92, 246, 1)",
    }),
    []
  );

  if (isLoading) {
    return (
      <div className="p-8">
        <Skeleton quantity={2} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-lg font-medium text-red-500 bg-red-50 rounded-lg border border-red-200">
        Error loading dashboard data. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl w-full">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Weekly Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <ChartCard
          title="Orders per Day"
          chartData={chartData.orderWeekCounts}
          labels={weekLabels}
          options={orderOptions}
          colors={orderColors}
        />

        <ChartCard
          title="Revenue per Day"
          chartData={chartData.lastWeekRevenueCounts}
          labels={weekLabels}
          options={revenueOptions}
          colors={revenueColors}
        />
      </div>
    </div>
  );
};

export default WeeklyDashboard;
