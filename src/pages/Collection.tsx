import { lazy, memo, Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useLocation } from "react-router-dom";
import Loader from "../components/shared/Loader/Loader";
import toast from "react-hot-toast";
import { resetFilters } from "../redux/reducers/productReducer";

const CollectionLayout = lazy(
  () => import("../components/layouts/CollectionLayout")
);
const SideBar = lazy(() => import("../components/collections/SideBar"));
const ProductLayout = lazy(
  () => import("../components/cards/product/ProductLayout")
);

const Collection = memo(({ forWhat }: any) => {
  const dispatch = useDispatch();
  const params = useLocation();
  const fromCategory = new URLSearchParams(params.search).get("category");

  const { categories, price, sizes, brands } = useSelector(
    (state: {
      product: {
        categories: string[];
        price: { min: number; max: number }[];
        sizes: string[];
        brands: { name: string }[];
        forWhat: { name: string }[];
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
          className="mt-4 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
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
                className="mt-4 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="max-w-full mx-auto h-full">
              <ProductLayout data={data} />
              <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-white bg-blue-600 rounded ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-white bg-blue-600 rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                >
                  Next
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
