import { useState, Suspense, lazy } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";

const Category = lazy(() => import("./Category"));
const DiscountSideBar = lazy(() => import("./DiscountSideBar"));
const PriceFilter = lazy(() => import("./PriceFilter"));
const SizeFilter = lazy(() => import("./SizeFilter"));
const BrandFilter = lazy(() => import("./BrandFilter"));
const RatingFilter = lazy(() => import("./RatingFilter"));

const SideBar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col bg-white shadow-md p-6 max-w-[250px] relative">
        <h1 className="text-2xl font-bold mb-4 ml-3">Filters</h1>
        <Suspense
          fallback={
            <div className="text-center text-gray-500">Loading filters...</div>
          }
        >
          <div className="filter-section">
            <DiscountSideBar />
          </div>
          <div className="filter-price">
            <PriceFilter />
          </div>
          <div className="filter-size">
            <SizeFilter />
          </div>
          <div className="filter-category">
            <Category />
          </div>
          <div className="filter-brand">
            <BrandFilter />
          </div>
          <div className="filter-rating">
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
        onClick={handleFilter}
        className="md:hidden p-4 text-black px-6 py-3 rounded-md flex items-center space-x-2"
      >
        {handleFilterMob ? (
          <IoMdClose size={24} />
        ) : (
          <LiaFilterSolid size={24} />
        )}
      </button>

      {handleFilterMob && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleFilter}
        ></div>
      )}

      {handleFilterMob && (
        <div
          className={`fixed top-0 left-0 w-4/5 h-full bg-white shadow-xl p-6 z-50 transition-all duration-500 ease-in-out transform overflow-y-auto ${
            handleFilterMob
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="w-full h-full justify-center flex flex-col gap-3">
            <div className="absolute top-4 right-4 mb-4">
              <button onClick={handleFilter} className="text-black">
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
              <div className="filter-section">
                <DiscountSideBar />
              </div>
              <div className="filter-price">
                <PriceFilter />
              </div>
              <div className="filter-size">
                <SizeFilter />
              </div>
              <div className="filter-category">
                <Category />
              </div>
              <div className="filter-brand">
                <BrandFilter />
              </div>
              <div className="filter-rating">
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
