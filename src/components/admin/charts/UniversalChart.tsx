
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
import 'chart.js/auto'; 


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const UniversalChart = ({ type, data, labels, options, colors }: any) => {
  const chartData = {
    labels: labels || [],
    datasets: [
      {
        label: options?.label || 'Data', 
        data: data || [],
        backgroundColor: colors?.backgroundColor || 'rgba(75, 192, 192, 0.5)', 
        borderColor: colors?.borderColor || 'rgba(75, 192, 192, 1)', 
        borderWidth: options?.borderWidth || 2, 
        hoverBackgroundColor: colors?.hoverBackgroundColor || 'rgba(75, 192, 192, 0.7)', 
        hoverBorderColor: colors?.hoverBorderColor || 'rgba(75, 192, 192, 1)',
        tension: options?.tension || 0.4, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: options?.title || 'Chart',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw} ${options?.unit || ''}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    ...options, 
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      case 'radar':
        return <Radar data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />; 
    }
  };

  return <div className="chart-container">{renderChart()}</div>;
};

export default UniversalChart;
