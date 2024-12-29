import { useMemo } from 'react';
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

type ChartProps = {
  type: 'bar' | 'line' | 'pie' | 'radar';
  data: number[];
  labels: string[];
  options: {
    title?: string;
    label?: string;
    unit?: string;
    borderWidth?: number;
    tension?: number;
    height?: number; 
    width?: number; 
  };
  colors: {
    backgroundColor?: string;
    borderColor?: string;
    hoverBackgroundColor?: string;
    hoverBorderColor?: string;
  };
};

const UniversalChart = ({ type, data, labels, options, colors }: ChartProps) => {

  const chartData = useMemo(() => ({
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
  }), [data, labels, options, colors]);

 
  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: options?.title || 'Chart',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} ${options?.unit || ''}`,
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
  }), [options]);


  const chartHeight = options?.height || 300; 
  const chartWidth = options?.width || 600; 

  
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} height={chartHeight} width={chartWidth} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} height={chartHeight} width={chartWidth} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} height={chartHeight} width={chartWidth} />;
      case 'radar':
        return <Radar data={chartData} options={chartOptions} height={chartHeight} width={chartWidth} />;
      default:
        return <Bar data={chartData} options={chartOptions} height={chartHeight} width={chartWidth} />;
    }
  };

  return (
    <div className="chart-container w-full max-w-full" style={{ height: 'auto', width: '100%' }}>
      {renderChart()}
    </div>
  );
};

export default UniversalChart;
