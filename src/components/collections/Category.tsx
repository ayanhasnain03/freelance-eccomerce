import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../redux/api/productApi";
import { setCategories } from "../../redux/reducers/productReducer";

const CategoryFilter = () => {
  const { data } = useGetCategoriesQuery("");
  const categoryOptions = useMemo(() => data?.categories || [], [data]); // Memoize category options

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Memoize toggleDropdown function
  const toggleDropdown = useCallback(() => setIsOpen((prevState) => !prevState), []);

  // Memoize handleCheckboxChange function
  const handleCheckboxChange = useCallback((name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name)
        ? prev.filter((categoryName) => categoryName !== name)
        : [...prev, name]
    );
  }, []);

  const handleApplyFilter = useCallback(() => {
    dispatch(setCategories(selectedCategories)); // Save category names to Redux state
  }, [dispatch, selectedCategories]);

  // Memoize selected category names to prevent re-calculation on every render
  const selectedCategoryNames = useMemo(
    () => categoryOptions.filter((category:any) => selectedCategories.includes(category.name)),
    [selectedCategories, categoryOptions]
  );

  return (
    <div className="w-full max-w-sm p-4 bg-white">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
      >
        <h3 className="text-lg font-semibold text-gray-800">Select By Category</h3>
        <MdKeyboardArrowDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
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
          {categoryOptions.map((category:any) => (
            <div key={category._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`category-${category._id}`}
                checked={selectedCategories.includes(category.name)} // Check based on category name
                onChange={() => handleCheckboxChange(category.name)} // Handle by category name
                className="text-teal-600 focus:ring-2 focus:ring-teal-500"
              />
              <label htmlFor={`category-${category._id}`} className="text-sm text-gray-700">
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

        {/* Display selected category names */}
        {selectedCategoryNames.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700">Selected Categories:</h4>
            <ul className="list-disc pl-5">
              {selectedCategoryNames.map((category: any) => (
                <li key={category._id} className="text-sm text-gray-600">{category.name}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryFilter;
