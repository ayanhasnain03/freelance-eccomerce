import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io"; // Using React Icon for dropdown

const categoryOptions = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home Appliances" },
  { id: 4, name: "Books" },
  { id: 5, name: "Sports" },
  { id: 6, name: "Toys" },
];

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full max-w-sm p-3 ">
      <div onClick={toggleDropdown} className="flex cursor-pointer justify-between items-center">
        <h3 className="text-lg font-semibold">Select By Category</h3>
        <button>
          <IoMdArrowDropdown
            className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            size={24}
          />
        </button>
      </div>

      {/* Animated Dropdown */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        {categoryOptions.map((category) => (
          <div key={category.id} className="flex items-center space-x-2 py-2">
            <input
              type="checkbox"
              id={`category-${category.id}`}
              className="text-sm text-gray-700"
            />
            <label htmlFor={`category-${category.id}`} className="text-sm text-gray-700">
              {category.name}
            </label>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Category
