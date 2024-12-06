import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

const categoryOptions = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home Appliances" },
  { id: 4, name: "Books" },
  { id: 5, name: "Sports" },
  { id: 6, name: "Toys" },
];

const CategoryFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const toggleDropdown = useCallback(
    () => setIsOpen((prevState) => !prevState),
    []
  );

  const handleCheckboxChange = useCallback((id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    );
  }, []);

  const handleApplyFilter = useCallback(() => {
    const selectedFilters = categoryOptions.filter((category) =>
      selectedCategories.includes(category.id)
    );
    const message =
      selectedFilters.map((category) => category.name).join(", ") ||
      "No categories selected";

    alert(`Selected categories: ${message}`);
  }, [selectedCategories]);

  const memoizedCategoryOptions = useMemo(() => categoryOptions, []);

  return (
    <div className="w-full max-w-sm p-4 bg-white">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Select By Category
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
        className="overflow-hidden mt-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {memoizedCategoryOptions.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
                className="text-teal-600 focus:ring-2 focus:ring-teal-500"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm text-gray-700"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplyFilter}
          className="mt-6 w-full bg-teal-400 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-teal-500 transition duration-200"
        >
          Apply Filter
        </button>
      </motion.div>
    </div>
  );
};

export default CategoryFilter;
