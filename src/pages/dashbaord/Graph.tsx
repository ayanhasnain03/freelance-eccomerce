import { useGetMonthsDashboardDataQuery } from "../../redux/api/dashboard";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import MenuBtn from "../../components/admin/MenuBtn";
import OrderPieChart from "../../components/admin/OrderPieChart";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = () => {
  const { data, error, isLoading } = useGetMonthsDashboardDataQuery("");

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error loading data</div>;

  const { revenueByMonth, ordersByMonth, usersByMonth } = data.stats;

  const revenueData = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const month = new Date(0, i).toLocaleString("default", { month: "short" });
      return month;
    }),
    datasets: [
      {
        label: "Revenue",
        data: revenueByMonth,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Revenue by Month",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue",
        },
        beginAtZero: true,
      },
    },
  };

  const ordersUsersData = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const month = new Date(0, i).toLocaleString("default", { month: "short" });
      return month;
    }),
    datasets: [
      {
        label: "Orders",
        data: ordersByMonth,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Users",
        data: usersByMonth,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };
 

  return (
    <div className="container mx-auto px-4 py-6">
      <MenuBtn />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Monthly Dashboard</h2>


      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Revenue by Month</h3>
        <Bar data={revenueData} options={barOptions} />
      </div>

   
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Orders & Users by Month</h3>
        <Bar data={ordersUsersData} options={barOptions} />
      </div>

  
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full  mx-auto">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Orders Status</h3>
        <OrderPieChart />
      </div>
    </div>
  );
};

export default Graph;
