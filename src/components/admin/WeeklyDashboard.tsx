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
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
    <h3 className="text-lg font-medium text-center text-gray-800 mb-4">
      {title}
    </h3>
    <UniversalChart
      type="bar"
      data={chartData}
      labels={labels}
      options={options}
      colors={colors}
    />
  </div>
);

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

  const orderLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const orderOptions = useMemo(
    () => ({
      title: "Orders per Day",
      unit: "Orders",
      label: "Orders",
    }),
    []
  );

  const revenueOptions = useMemo(
    () => ({
      title: "Revenue per Day",
      unit: "₹",
      label: "Revenue",
    }),
    []
  );

  const orderColors = useMemo(
    () => ({
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 1)",
      hoverBackgroundColor: "rgba(54, 162, 235, 0.7)",
      hoverBorderColor: "rgba(54, 162, 235, 1)",
    }),
    []
  );

  const revenueColors = useMemo(
    () => ({
      backgroundColor: "rgba(255, 159, 64, 0.5)",
      borderColor: "rgba(255, 159, 64, 1)",
      hoverBackgroundColor: "rgba(255, 159, 64, 0.7)",
      hoverBorderColor: "rgba(255, 159, 64, 1)",
    }),
    []
  );

  if (isLoading) {
    return <Skeleton quantity={2} />;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500">Error loading data</div>
    );
  }

  return (
    <div className="p-2 bg-gray-50 rounded-lg shadow-xl w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Weekly Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        <ChartCard
          title="Orders per Day"
          chartData={chartData.orderWeekCounts}
          labels={orderLabels}
          options={orderOptions}
          colors={orderColors}
        />

        <ChartCard
          title="Revenue per Day"
          chartData={chartData.lastWeekRevenueCounts}
          labels={orderLabels} // Same labels can be reused
          options={revenueOptions}
          colors={revenueColors}
        />
      </div>
    </div>
  );
};

export default WeeklyDashboard;
