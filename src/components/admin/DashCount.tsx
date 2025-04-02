import { useGetDashCountQuery } from '../../redux/api/dashboard';
import { FaShoppingCart, FaBoxOpen, FaUsers, FaRupeeSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import Skeleton from '../shared/Skeleton';
import { useEffect } from 'react';

const DashCount = () => {
  const { data, isLoading, error, refetch } = useGetDashCountQuery('');

  useEffect(() => {
    if(data) {
      refetch();
    }
  }, [data, refetch]);

  if (isLoading) {
    return <Skeleton quantity={4} />;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 text-xl font-semibold">
          Error loading dashboard data
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Orders',
      value: data?.totalOrders || 0,
      percentage: data?.orderPercentageIncrease?.percentage || 0,
      color: data?.orderPercentageIncrease?.color,
      icon: <FaShoppingCart className="text-3xl" />,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Total Products', 
      value: data?.totalProducts || 0,
      percentage: data?.productPercentageIncrease?.percentage || 0,
      color: data?.productPercentageIncrease?.color,
      icon: <FaBoxOpen className="text-3xl" />,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Total Users',
      value: data?.totalUsers || 0,
      percentage: data?.userPercentageIncrease?.percentage || 0,
      color: data?.userPercentageIncrease?.color,
      icon: <FaUsers className="text-3xl" />,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      title: 'Revenue',
      value: `₹${data?.totalRevenueAmount?.toFixed(2) || 0}`,
      percentage: data?.revenuePercentageIncrease?.percentage || 0,
      color: data?.revenuePercentageIncrease?.color,
      icon: <FaRupeeSign className="text-3xl" />,
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-500'
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.iconColor} p-3 rounded-xl ${stat.bgColor}`}>
                {stat.icon}
              </div>
              {stat.percentage !== 0 && (
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm">
                  {stat.percentage > 0 ? (
                    <FaArrowUp className="text-green-500 text-xs" />
                  ) : (
                    <FaArrowDown className="text-red-500 text-xs" />
                  )}
                  <span className={`text-sm font-medium ${stat.percentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(stat.percentage)}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-3">
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashCount;
