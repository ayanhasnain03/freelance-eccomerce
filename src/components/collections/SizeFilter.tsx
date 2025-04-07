import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSizes } from "../../redux/reducers/productReducer";

const sizeOptions = [
  // "S",
  // "M",
  // "L",
  // "XL",
  // "XXL",
  "Semi stitched",
  "Unstitched",
  "Free size",
];

const SizeFilter = () => {
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const dispatch = useDispatch();
  const toggleSizeDropdown = useCallback(
    () => setIsSizeOpen((prev) => !prev),
    []
  );

  const handleCheckboxChange = useCallback((size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((selectedSize) => selectedSize !== size)
        : [...prev, size]
    );
  }, []);

  const handleApplyFilter = useCallback(() => {
    dispatch(setSizes(selectedSizes));
  }, [selectedSizes]);

  const memoizedSizeOptions = useMemo(() => sizeOptions, []);

  return (
    <div className="p-4 bg-white w-full">
      <div
        onClick={toggleSizeDropdown}
        className="flex justify-between items-center cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleSizeDropdown()}
        aria-expanded={isSizeOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">Size Filters</h3>
        <MdKeyboardArrowDown
          className={`transition-transform duration-300 ${
            isSizeOpen ? "rotate-180" : "rotate-0"
          }`}
          size={24}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isSizeOpen ? 1 : 0,
          height: isSizeOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="mt-4 overflow-hidden"
      >
        <div className="grid grid-cols-2 gap-3">
          {memoizedSizeOptions.map((size) => (
            <div key={size} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onChange={() => handleCheckboxChange(size)}
                className="w-5 h-5  border-gray-300 rounded cursor-pointer "
              />
              <label
                htmlFor={`size-${size}`}
                className="text-sm font-medium text-gray-700  cursor-pointer"
              >
                {size}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplyFilter}
          className="mt-6 w-full bg-primary-red text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Apply Filter
        </button>
      </motion.div>
    </div>
  );
};

export default SizeFilter;
