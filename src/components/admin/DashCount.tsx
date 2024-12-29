import { useGetDashCountQuery } from '../../redux/api/dashboard';
import { FaShoppingCart, FaBoxOpen, FaUsers, FaRupeeSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';

import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import Skeleton from '../shared/Skeleton';
import { useEffect } from 'react';

const DashCount = () => {
  const { data, isLoading, error, refetch } = useGetDashCountQuery('');


useEffect(() => {
 if(data){
  refetch();
 }
}, [data, refetch]);


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
      icon: <FaShoppingCart className="text-2xl" />, 
    },
    {
      title: 'Total Products',
      value: data?.totalProducts || 0,
      percentage: data?.productPercentageIncrease?.percentage || 0,
      color: data?.productPercentageIncrease?.color,
      icon: <FaBoxOpen className="text-2xl" />, 
    },
    {
      title: 'Total Users',
      value: data?.totalUsers || 0,
      percentage: data?.userPercentageIncrease?.percentage || 0,
      color: data?.userPercentageIncrease?.color,
      icon: <FaUsers className="text-2xl" />, // Reduced icon size
    },
    {
      title: 'Revenue',
      value: `₹${data?.totalRevenueAmount?.toFixed(2) || 0}`,
      percentage: data?.revenuePercentageIncrease?.percentage || 0,
      color: data?.revenuePercentageIncrease?.color,
      icon: <FaRupeeSign className="text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white rounded-lg shadow-lg">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="relative bg-white rounded-lg p-6 shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex items-center space-x-2 mb-4"> 
            {stat.icon}
            <h3 className="text-sm font-semibold text-gray-800">{stat.title}</h3> 
          </div>
          <p className="text-xl font-bold text-gray-800">{stat.value}</p> 
          
          {stat.percentage !== 0 && (
            <div className="absolute top-2 right-2 flex items-center space-x-1">
              {stat.percentage > 0 ? (
                <FaArrowUp className="text-green-500 text-xs" />
              ) : (
                <FaArrowDown className="text-red-500 text-xs" />
              )}
              <span className={`text-xs ${stat.percentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(stat.percentage)}%
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default DashCount;
