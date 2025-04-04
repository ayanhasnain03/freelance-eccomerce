import { useState, useCallback, useMemo } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setRating } from "../../redux/reducers/productReducer";

const RatingFilter = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleRatingChange = useCallback(
    (rating: number) => {
      setSelectedRating(rating === selectedRating ? null : rating);
      setIsDropdownOpen(false);
    },
    [selectedRating]
  );

  const ratingOptions = useMemo(() => {
    return [5, 4, 3, 2, 1];
  }, []);

  const dispatch = useDispatch();

  const handleApplyFilter = () => {
    dispatch(setRating(selectedRating));
  };

  const handleResetFilter = () => {
    setSelectedRating(null); 
    dispatch(setRating(null)); 
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Rating Filter
      </h3>

      <div className="relative">
        <div
          onClick={toggleDropdown}
          className="flex items-center w-full justify-between p-2 border-2 border-gray-300 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:border-teal-500"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
          aria-expanded={isDropdownOpen}
        >
          <span className="text-sm text-gray-700">
            {selectedRating ? (
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, index) =>
                  index < selectedRating ? (
                    <FaStar key={index} className="text-yellow-500" />
                  ) : (
                    <FaRegStar key={index} className="text-yellow-500" />
                  )
                )}
              </div>
            ) : (
              "Select Rating"
            )}
          </span>

          <MdKeyboardArrowDown
            className={`transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            size={20}
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
            {ratingOptions.map((rating) => (
              <div
                key={rating}
                className="flex items-center p-3 cursor-pointer hover:bg-teal-100"
                onClick={() => handleRatingChange(rating)}
              >
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, index) =>
                    index < rating ? (
                      <FaStar key={index} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={index} className="text-yellow-500" />
                    )
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-700">
                  {rating} Star{rating > 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleApplyFilter}
          className="w-full bg-primary-red text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-primary-red/80 transition duration-200"
        >
          Apply Filter
        </button>
        <button
          onClick={handleResetFilter}
          className="w-full bg-gray-300 text-gray-800 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default RatingFilter;
