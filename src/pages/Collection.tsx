import { lazy, memo, Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useLocation } from "react-router-dom";
import Loader from "../components/shared/Loader/Loader";
import toast from "react-hot-toast";
import { resetFilters } from "../redux/reducers/productReducer";

const CollectionLayout = lazy(() =>
  import("../components/layouts/CollectionLayout")
);
const SideBar = lazy(() => import("../components/collections/SideBar"));
const ProductLayout = lazy(() =>
  import("../components/cards/product/ProductLayout")
);

const Collection = memo(({ forWhat }: any) => {
  const dispatch = useDispatch();
  const params = useLocation();
  const fromCategory = new URLSearchParams(params.search).get("category");

  const { categories, price, sizes, brands, rating } = useSelector(
    (state: {
      product: {
        categories: string[];
        price: { min: number; max: number }[];
        sizes: string[];
        brands: { name: string }[];
        forWhat: { name: string }[];
        rating: number;
      };
    }) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);

  const selectedBrand = useMemo(
    () => brands.map((brand) => brand.name),
    [brands]
  );

  const category = useMemo(
    () =>
      fromCategory
        ? fromCategory
        : categories.length > 0
        ? categories.join(",")
        : "",
    [fromCategory, categories]
  );

  const priceRanges = useMemo(
    () =>
      price.length > 0
        ? price.map((range) => `${range.min}-${range.max}`).join(",")
        : "",
    [price]
  );

  const { data, error, isLoading, refetch } = useGetProductsQuery({
    category,
    price: priceRanges,
    sizes: sizes.join(","),
    brand: selectedBrand.join(","),
    forwhat: forWhat,
    page: currentPage,
    rating,
  });

  const totalPages = data?.totalPage || 1;

  const handleResetFilters = () => {
    setCurrentPage(1);
    dispatch(resetFilters());
    window.location.reload();
  };

  useEffect(() => {
    refetch();
  }, [category, priceRanges, sizes, selectedBrand, forWhat, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    dispatch(resetFilters());
  }, [forWhat, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast.error("Error fetching products. Please try again.");
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mt-2">
          We couldn't load the products. Please check your connection or try
          again later.
        </p>
        <button
          onClick={handleResetFilters}
          className="mt-4 px-6 py-2 text-white bg-rose-600 rounded hover:bg-rose-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row relative h-full bg-white">
      <Suspense fallback={<Loader />}>
        <CollectionLayout>
          <div>
            <SideBar />
          </div>
          {data?.products?.length === 0 ? (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 md:left-1/2 text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                No products found
              </h1>
              <p className="text-gray-600 mt-2">
                Try adjusting your filters or search criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-6 py-2 text-white bg-rose-600 rounded hover:bg-rose-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="max-w-full mx-auto h-full p-8 mt-20 md:p-0 md:mt-0">
              <ProductLayout data={data} />

     
              <div className="flex justify-center items-center mt-6 space-x-2">
 
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${
      currentPage > 1 ? "hover:bg-blue-500 hover:text-white" : "opacity-50 cursor-not-allowed"
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, index) => {
    const page = index + 1;

    if (
      totalPages > 5 &&
      (page !== 1 && page !== totalPages) &&
      (page < currentPage - 1 || page > currentPage + 1)
    ) {
      return (
        index === currentPage - 3 || index === currentPage + 1 ? (
          <span key={page} className="px-2 text-gray-500">
            ...
          </span>
        ) : null
      );
    }

    return (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-4 py-2 mx-1 rounded-md ${
          page === currentPage
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
        }`}
      >
        {page}
      </button>
    );
  })}

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${
      currentPage < totalPages ? "hover:bg-blue-500 hover:text-white" : "opacity-50 cursor-not-allowed"
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 10l-3.293-3.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
</div>

            </div>
          )}
        </CollectionLayout>
      </Suspense>
    </div>
  );
});

export default Collection;
