import { useState, Suspense, lazy } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import Highlighter from "../shared/Highlight";


const Category = lazy(() => import("./Category"));
const PriceFilter = lazy(() => import("./PriceFilter"));
const SizeFilter = lazy(() => import("./SizeFilter"));
const RatingFilter = lazy(() => import("./RatingFilter"));

const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <div className="hidden md:flex flex-col max-w-[210px] bg-white h-screen p-2 sticky top-0">
        <div className="flex items-center justify-between px-4">
          <Highlighter text="Filters" />
          <LiaFilterSolid className="text-2xl" />
        </div>
        <Suspense
          fallback={
            <div className="text-center text-gray-500">Loading filters...</div>
          }
        >
          <div className="filter-price mb-4 mt-10">
            <PriceFilter />
          </div>
          <div className="filter-size mb-4">
            <SizeFilter />
          </div>
          {location.search.includes("category") ? null : (
            <div className="filter-category mb-4">
              <Category />
            </div>
          )}
          <div className="filter-rating mb-4">
            <RatingFilter />
          </div>
        </Suspense>
      </div>

      <div className="md:hidden">
        <SideBarMobile />
      </div>
    </>
  );
};

const SideBarMobile = () => {
  const [handleFilterMob, setHandleFilterMob] = useState(false);

  const handleFilter = () => setHandleFilterMob(!handleFilterMob);

  return (
    <div>
      <button
        type="button"
        aria-label="Filters"
        onClick={handleFilter}
        className="md:hidden absolute p-4 text-white top-4 left-4 z-50 rounded-full bg-primary-red shadow-lg"
      >
        {handleFilterMob ? (
          <IoMdClose size={24} />
        ) : (
          <LiaFilterSolid size={24} />
        )}
      </button>

      {handleFilterMob && (
        <div
          className={`fixed top-0 left-0 w-4/5 md:w-2/3 h-full bg-white p-6 z-50 transition-all duration-500 ease-in-out transform overflow-y-auto shadow-xl rounded-r-lg ${
            handleFilterMob
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="w-full h-full flex flex-col gap-6">
            <div className="absolute top-4 right-4">
              <button
                onClick={handleFilter}
                className="text-teal-600"
                aria-label="Close"
              >
                <IoMdClose size={30} />
              </button>
            </div>

            <Suspense
              fallback={
                <div className="text-center text-gray-500">
                  Loading filters...
                </div>
              }
            >
              <div className="filter-price mb-6">
                <PriceFilter />
              </div>
              <div className="filter-size mb-6">
                <SizeFilter />
              </div>
              {location.search.includes("category") ? null : (
                <div className="filter-category mb-6">
                  <Category />
                </div>
              )}
              <div className="filter-rating mb-6">
                <RatingFilter />
              </div>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
