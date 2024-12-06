import { useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

const brands = [
  { id: 1, name: "Nike" },
  { id: 2, name: "Adidas" },
  { id: 3, name: "Puma" },
  { id: 4, name: "Reebok" },
  { id: 5, name: "Under Armour" },
  { id: 6, name: "New Balance" },
  { id: 7, name: "Asics" },
  { id: 8, name: "Converse" },
];

const BrandFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (id: number) => {
    setSelectedBrands((prev) =>
      prev.includes(id)
        ? prev.filter((brandId) => brandId !== id)
        : [...prev, id]
    );
  };

  const handleApplyFilter = () => {
    const selectedFilters = brands.filter((brand) =>
      selectedBrands.includes(brand.id)
    );
    const message =
      selectedFilters.map((brand) => brand.name).join(", ") ||
      "No brands selected";

    alert(`Selected brands: ${message}`);
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white ">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
      >
        <h3 className="text-lg font-semibold text-gray-800">Brand Filter</h3>
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
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onChange={() => handleCheckboxChange(brand.id)}
                className="text-teal-600 focus:ring-2 focus:ring-teal-500"
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="text-sm text-gray-700"
              >
                {brand.name}
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

export default BrandFilter;
