import { useState } from 'react';
import { FaUsers, FaBox, FaChartBar, FaEnvelope, FaTimes } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MenuBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-20"
          onClick={toggleMenu}
        ></div>
      )}


      <button
        onClick={toggleMenu}
        className="p-4 bg-black border-2 border-white rounded-full shadow-xl text-white focus:outline-none fixed top-5 left-5 z-30 transition-transform transform hover:scale-110"
      >
        <MdDashboard className="w-6 h-6" />
      </button>


      <div
        className={`fixed top-0 left-0 h-full w-72 bg-black shadow-2xl rounded-r-xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex justify-between items-center py-4 px-5 bg-black text-white rounded-tl-xl">
          <button onClick={toggleMenu} className="text-2xl">
            <FaTimes />
          </button>
          <h2 className="text-xl font-semibold">Menu</h2>
        </div>


        <div className="flex flex-col space-y-5 p-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <MdDashboard className="text-white w-6 h-6" />
            <span className="text-lg font-medium text-white">Dashboard</span>
          </Link>

          <Link
            to="/dashboard/users"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <FaUsers className="text-white w-6 h-6" />
            <span className="text-lg font-medium text-white">User Management</span>
          </Link>

          <Link
            to="/dashboard/orders"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <FaBox className="text-white w-6 h-6" />
            <span className="text-lg font-medium text-white">Orders</span>
          </Link>

          <Link
            to="/dashboard/graphs"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <FaChartBar className="text-white w-6 h-6" />
            <span className="text-lg font-medium text-white">Graphs/Transactions</span>
          </Link>

          <Link
            to="/dashboard/messages"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <FaEnvelope className="text-white w-6 h-6" />
            <span className="text-lg font-medium text-white">Messages</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuBtn;
