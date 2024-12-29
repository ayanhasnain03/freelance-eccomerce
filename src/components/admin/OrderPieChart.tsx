import { useEffect } from "react";
import { useGetOrderPieChartQuery } from "../../redux/api/dashboard";
import UniversalChart from "./charts/UniversalChart";

const OrderPieChart = () => {
  const { data, error, isLoading, refetch } = useGetOrderPieChartQuery("");

  useEffect(() => {
if(data){
  refetch();
}
  }, [data, refetch]);

  if (isLoading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500">
        Error loading order data
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-lg text-red-500">No data available</div>
    );
  }

  const labels: string[] = Object.keys(data.orderStatusCounts);
  const chartData: number[] = Object.values(data.orderStatusCounts);

  const labelsForPayment: string[] = Object.keys(data.paymentMethodCounts);
  const chartDataForPayment: number[] = Object.values(data.paymentMethodCounts);

  const options = {
    title: "Order Status Distribution",
    unit: "",
    label: "Status",
  };

  const optionsForPayment = {
    title: "Payment Method Distribution",
    unit: "",
    label: "Payment Method",
  };

  const colors = {
    backgroundColor: [
      "rgba(94, 114, 228, 0.6)",
      "rgba(244, 88, 88, 0.6)",
      "rgba(72, 187, 120, 0.6)",
      "rgba(246, 194, 62, 0.6)",
      "rgba(102, 108, 255, 0.6)",
    ],
    borderColor: [
      "rgba(94, 114, 228, 1)",
      "rgba(244, 88, 88, 1)",
      "rgba(72, 187, 120, 1)",
      "rgba(246, 194, 62, 1)",
      "rgba(102, 108, 255, 1)",
    ],
  };

  const colorsForPayment = {
    backgroundColor: [
      "rgba(47, 128, 237, 0.6)",
      "rgba(235, 59, 90, 0.6)",
      "rgba(32, 201, 151, 0.6)",
      "rgba(255, 159, 67, 0.6)",
      "rgba(153, 102, 255, 0.6)",
    ],
    borderColor: [
      "rgba(47, 128, 237, 1)",
      "rgba(235, 59, 90, 1)",
      "rgba(32, 201, 151, 1)",
      "rgba(255, 159, 67, 1)",
      "rgba(153, 102, 255, 1)",
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium text-center text-gray-800 mb-4">
        Order Status Distribution
      </h3>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="w-full md:w-1/2">
          <UniversalChart
            type="pie"
            data={chartData}
            labels={labels}
            options={options}
            //@ts-ignore
            colors={colors}
          />
        </div>
        <div className="w-full md:w-1/2">
          <UniversalChart
            type="pie"
            data={chartDataForPayment}
            labels={labelsForPayment}
            options={optionsForPayment}
            //@ts-ignore
            colors={colorsForPayment}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderPieChart;
