import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

const priceRanges = [
  { id: 1, label: "₹200 - ₹499", min: 200, max: 499 },
  { id: 2, label: "₹500 - ₹999", min: 500, max: 999 },
  { id: 3, label: "₹1000 - ₹1999", min: 1000, max: 1999 },
  { id: 4, label: "₹2000 - ₹2999", min: 2000, max: 2999 },
  { id: 5, label: "₹3000 - ₹3999", min: 3000, max: 3999 },
  { id: 6, label: "₹4000 - ₹4999", min: 4000, max: 4999 },
  { id: 7, label: "₹5000 - ₹9999", min: 5000, max: 9999 },
  { id: 8, label: "₹10000+", min: 10000, max: Infinity },
];

const PriceFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);

  const memoizedPriceRanges = useMemo(() => priceRanges, []);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleCheckboxChange = useCallback((id: number) => {
    setSelectedRanges((prev) =>
      prev.includes(id)
        ? prev.filter((rangeId) => rangeId !== id)
        : [...prev, id]
    );
  }, []);

  const handleApplyFilter = useCallback(() => {
    const selectedFilters = memoizedPriceRanges.filter((range) =>
      selectedRanges.includes(range.id)
    );
    const message = selectedFilters.length
      ? `Selected price ranges: ${selectedFilters
          .map((range) => range.label)
          .join(", ")}`
      : "No price range selected";
    alert(message);
  }, [memoizedPriceRanges, selectedRanges]);

  return (
    <div className="w-full max-w-sm p-4 bg-white">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">Price Filter</h3>
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
        className="overflow-hidden mt-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {memoizedPriceRanges.map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`price-range-${range.id}`}
                checked={selectedRanges.includes(range.id)}
                onChange={() => handleCheckboxChange(range.id)}
                className="text-teal-600 focus:ring-2 focus:ring-teal-500"
              />
              <label
                htmlFor={`price-range-${range.id}`}
                className="text-sm text-gray-700"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplyFilter}
          className="mt-6 w-full bg-teal-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200"
        >
          Apply Filter
        </button>
      </motion.div>
    </div>
  );
};

export default PriceFilter;