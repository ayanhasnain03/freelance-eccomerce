import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io"; // Using React Icon for dropdow

const DiscountSideBar = () => {

  const [isOpen, setIsOpen] = useState(false);


  const discountCategories = [
    { id: 1, name: "10% OFF" },
    { id: 2, name: "20% OFF" },
    { id: 3, name: "30% OFF" },
    { id: 4, name: "50% OFF" },
  ];


  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full max-w-sm p-4  rounded-lg">
      <div onClick={toggleDropdown}  className="flex cursor-pointer justify-between items-center">
        <h3 className="text-lg font-semibold">Discount Filters</h3>
        <button >
          <IoMdArrowDropdown className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} size={24} />
        </button>
      </div>

      {/* Animated Dropdown */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        <div>
          {discountCategories.map((discount) => (
            <div key={discount.id} className="flex items-center space-x-2 py-2">
              <input type="checkbox" id={`discount-${discount.id}`} />
              <label htmlFor={`discount-${discount.id}`} className="text-sm text-gray-700">{discount.name}</label>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DiscountSideBar;
