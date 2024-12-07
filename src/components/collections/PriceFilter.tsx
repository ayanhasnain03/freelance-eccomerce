import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setPrice } from "../../redux/reducers/productReducer";

// Define price ranges with ids
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
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);

  // Memoize price ranges to avoid unnecessary recalculations
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
    // Get the selected price range labels
    const selectedFilters = memoizedPriceRanges.filter((range) =>
      selectedRanges.includes(range.id)
    );

    // Dispatch the selected ranges to the Redux store
    dispatch(setPrice(selectedFilters));

    // Optionally log the selected ranges for debugging
    console.log(
      "Selected price ranges:",
      selectedFilters.map((range) => range.label).join(", ")
    );
  }, [memoizedPriceRanges, selectedRanges, dispatch]);

  const handleClearAll = () => {
    setSelectedRanges([]);
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">Price Filter</h3>
        {isOpen ? (
          <MdKeyboardArrowUp
            className="transition-transform duration-300"
            size={24}
          />
        ) : (
          <MdKeyboardArrowDown
            className="transition-transform duration-300"
            size={24}
          />
        )}
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
                aria-label={`Price range ${range.label}`}
              />
              <label htmlFor={`price-range-${range.id}`} className="text-sm text-gray-700">
                {range.label}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={handleApplyFilter}
            disabled={selectedRanges.length === 0}
            className={`w-full ${selectedRanges.length === 0 ? "bg-gray-400" : "bg-teal-500"} text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200`}
          >
            Apply Filter
          </button>
          <button
            onClick={handleClearAll}
            className="w-full text-teal-500 text-sm font-medium py-2 px-4 rounded-lg hover:bg-teal-100 transition duration-200"
          >
            Clear All
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PriceFilter;
