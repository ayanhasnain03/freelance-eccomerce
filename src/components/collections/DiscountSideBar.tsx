import { useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

const DiscountSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);

  const discountCategories = [
    { id: 1, name: "10% OFF" },
    { id: 2, name: "20% OFF" },
    { id: 3, name: "30% OFF" },
    { id: 4, name: "50% OFF" },
  ];

  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  const handleCheckboxChange = (id: number) => {
    setSelectedDiscounts((prev) =>
      prev.includes(id)
        ? prev.filter((discountId) => discountId !== id)
        : [...prev, id]
    );
  };

  const handleApplyFilters = () => {
    const selected = discountCategories.filter((discount) =>
      selectedDiscounts.includes(discount.id)
    );
    const message = selected.length
      ? `Selected discounts: ${selected
          .map((discount) => discount.name)
          .join(", ")}`
      : "No discounts selected";
    alert(message);
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white">
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Discount Filters
        </h3>
        <MdKeyboardArrowDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          size={24}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 overflow-hidden"
      >
        <div className="grid grid-cols-2 gap-3">
          {discountCategories.map((discount) => (
            <div
              key={discount.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <input
                type="checkbox"
                id={`discount-${discount.id}`}
                checked={selectedDiscounts.includes(discount.id)}
                onChange={() => handleCheckboxChange(discount.id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`discount-${discount.id}`}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {discount.name}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplyFilters}
          className="mt-6 w-full bg-teal-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200"
        >
          Apply Filters
        </button>
      </motion.div>
    </div>
  );
};

export default DiscountSideBar;
