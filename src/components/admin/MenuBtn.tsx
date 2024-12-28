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
    <div className="fixed z-50">
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMenu}  
        ></div>
      )}


      <button 
        onClick={toggleMenu} 
        className="p-4 bg-white border-2 border-black rounded-full shadow-lg focus:outline-none z-30 absolute top-5 left-5 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <MdDashboard className="text-black w-6 h-6" />
      </button>

    
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex justify-between items-center py-4 px-5">
          <button 
            onClick={toggleMenu} 
            className="text-black text-2xl"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>
        </div>

     
        <div className="flex flex-col space-y-4 p-4">
          
          <Link to="/dashboard" className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105">
            <MdDashboard className="text-black w-6 h-6" />
            <span className="text-lg font-medium text-black">Dashboard</span>
          </Link>

        
          <Link to="/dashboard/users" className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105">
            <FaUsers className="text-black w-6 h-6" />
            <span className="text-lg font-medium text-black">User Management</span>
          </Link>

          <Link to="/dashboard/orders" className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105">
            <FaBox className="text-black w-6 h-6" />
            <span className="text-lg font-medium text-black">Orders</span>
          </Link>

          <Link to="/dashboard/graphs" className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105">
            <FaChartBar className="text-black w-6 h-6" />
            <span className="text-lg font-medium text-black">Graphs/Transactions</span>
          </Link>

          
          <Link to="/dashboard/messages" className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105">
            <FaEnvelope className="text-black w-6 h-6" />
            <span className="text-lg font-medium text-black">Messages</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuBtn;
