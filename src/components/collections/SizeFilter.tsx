import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";

const sizeOptions = ["S", "M", "L", "XL", "XXL"];

const SizeFilter = () => {
  const [isSizeOpen, setIsSizeOpen] = useState(false);

  const toggleSizeDropdown = () => setIsSizeOpen((prev) => !prev);

  return (
    <div>
      <div className="flex justify-between items-center px-3">
        <h3 className="text-lg font-semibold">Size Filters</h3>
        <button onClick={toggleSizeDropdown}>
          <IoMdArrowDropdown
            className={`transition-transform ${isSizeOpen ? "rotate-180" : "rotate-0"}`}
            size={24}
          />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isSizeOpen ? 1 : 0, height: isSizeOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 grid grid-cols-2 gap-4"
      >
        {sizeOptions.map((size) => (
          <div key={size} className="flex items-center gap-2 px-3">
            <input type="checkbox" id={`size-${size}`} />
            <label htmlFor={`size-${size}`} className="text-sm text-gray-700">{size}</label>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SizeFilter;
