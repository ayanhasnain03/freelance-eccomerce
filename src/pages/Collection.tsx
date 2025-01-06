import { lazy, memo, Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const initialPage = Number(query.get("page")) || 1;
  const fromCategory = query.get("category");

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

  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const selectedBrand = useMemo(() => brands.map((brand) => brand.name), [brands]);

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

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    navigate(`?page=${page}${fromCategory ? `&category=${fromCategory}` : ""}`);
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    dispatch(resetFilters());
    navigate("?page=1");
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [category, priceRanges, sizes, selectedBrand, forWhat, currentPage, refetch]);



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
          <div className="h-full">
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
            <div className="max-w-full mx-auto h-full md:p-8 mt-10 md:mt-0">
              
              <ProductLayout data={data} />

              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  onClick={() =>{
                    handlePageChange(Math.max(currentPage - 1, 1))
                    window.scrollTo(0, 0);
                  }}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${
                    currentPage > 1
                      ? "hover:bg-primary-red/80 hover:text-white"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  &lt; Prev
                </button>
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        handlePageChange(page)
                        window.scrollTo(0, 0);
                      }}
                      className={`px-4 py-2 mx-1 rounded-md ${
                        page === currentPage
                          ? "bg-primary-red text-white"
                          : "bg-white text-gray-700 hover:bg-primary-red/80 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                   {
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                    window.scrollTo(0, 0);
                   }
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${
                    currentPage < totalPages
                      ? "hover:bg-primary-red hover:text-white"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Next &gt;
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
