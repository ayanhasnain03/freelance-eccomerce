import { Link } from 'react-router-dom';
import { useGteLatestTransactionsQuery } from '../../redux/api/dashboard';

const LatestTransaction = () => {
  const { data, isLoading, error } = useGteLatestTransactionsQuery("");

  if (isLoading) {
    return <div className="text-center text-xl font-semibold text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center text-lg">Error loading transactions</div>;
  }

  return (
    <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Order History</h3>

      <div className="space-y-6">
        {data?.orders?.map((order: any, index: number) => (
          <Link to={`/order/${order._id}`} key={index}>
            <div className="flex justify-between items-center p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-b border-gray-200 cursor-pointer">
              <div>
                <p className="font-medium text-gray-800 text-lg">
                  Order #{order.orderId}
                </p>
                <p className="text-sm text-gray-500">
                  Status: <span className={`font-semibold ${order.status === 'Shipped' ? 'text-green-600' : 'text-red-600'}`}>{order.status}</span>
                </p>
              </div>
              <div className="text-lg font-semibold text-gray-700">
                ₹{order.total.toFixed(2)}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link to="/myorders">
          <button className="text-red-600 font-semibold hover:text-red-800 hover:underline transition duration-200">
            View All Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestTransaction;
