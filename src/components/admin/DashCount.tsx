import { useGetDashCountQuery } from '../../redux/api/dashboard';
import { FaShoppingCart, FaBoxOpen, FaUsers, FaRupeeSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import Skeleton from '../shared/Skeleton';

const DashCount = () => {
  const { data, isLoading, error } = useGetDashCountQuery('');

  if (isLoading) {
    return <Skeleton quantity={4} />;
  }

  if (error) {
    return <div className="text-red-500 text-center text-lg">Error loading dashboard data</div>;
  }

  const stats = [
    {
      title: 'Total Orders',
      value: data?.totalOrders || 0,
      percentage: data?.orderPercentageIncrease?.percentage || 0,
      color: data?.orderPercentageIncrease?.color,
      icon: <FaShoppingCart className="text-4xl =" />,
    },
    {
      title: 'Total Products',
      value: data?.totalProducts || 0,
      percentage: data?.productPercentageIncrease?.percentage || 0,
      color: data?.productPercentageIncrease?.color,
      icon: <FaBoxOpen className="text-4xl" />,
    },
    {
      title: 'Total Users',
      value: data?.totalUsers || 0,
      percentage: data?.userPercentageIncrease?.percentage || 0,
      color: data?.userPercentageIncrease?.color,
      icon: <FaUsers className="text-4xl" />,
    },
    {
      title: 'Revenue',
      value: `₹${data?.totalRevenueAmount?.toFixed(2) || 0}`,
      percentage: data?.revenuePercentageIncrease?.percentage || 0,
      color: data?.revenuePercentageIncrease?.color,
      icon: <FaRupeeSign className="text-4xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6  rounded-lg shadow-xl">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="flex relative flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            {stat.icon}
            <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          <div className="w-12 h-12 mt-4 absolute right-3 bottom-1">
            <CircularProgressbar
              value={Math.abs(stat.percentage)}
              styles={buildStyles({
                textColor: '#000000',
                pathColor: stat.color === 'green' ? '#16a34a' : stat.color === 'red' ? '#dc2626' : '#3b82f6',
                trailColor: '#f3f4f6',
                textSize: '18px',
                pathTransitionDuration: 0.5,
              })}
            />
             <div className="absolute top-1/3 right-2 text-gray-800 flex items-center space-x-4">
            {stat.percentage < 0 ? (
              <>
                <FaArrowDown className="text-red-500 text-xs mr-2" />
                <span className="text-xs text-red-500">-{Math.abs(stat.percentage)}%</span>
              </>
            ) : stat.percentage > 0 ? (
              <>
                <FaArrowUp className="text-green-500 text-xs" />
                <span className="text-xs text-green-500">{Math.abs(stat.percentage)}%</span>
              </>
            ) : null}
          </div>
          </div>
         
        </motion.div>
      ))}
    </div>
  );
};

export default DashCount;
