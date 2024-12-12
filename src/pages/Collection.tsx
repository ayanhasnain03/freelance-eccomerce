import { lazy, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import SideBar from "../components/collections/SideBar";
import ProductLayout from "../components/cards/product/ProductLayout";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useLocation } from "react-router-dom";

const CollectionLayout = lazy(
  () => import("../components/layouts/CollectionLayout")
);

const Collection = () => {
  const params = useLocation();

  const fromCategory = new URLSearchParams(params.search).get("category");

  const { categories, price } = useSelector(
    (state: {
      product: {
        categories: string[];
        price: { min: number; max: number }[];
        sizes: string[];
      };
    }) => state.product
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

  // Map price ranges for the query
  const priceRanges = useMemo(
    () =>
      price.length > 0
        ? price.map((range) => `${range.min}-${range.max}`).join(",")
        : "",
    [price]
  );

  // Fetch products using the category and price ranges
  const { data, error, isLoading } = useGetProductsQuery({
    category,
    price: priceRanges,
    sizes: "", // You can expand this if sizes are needed
  });

  if (isLoading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading products</div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <Suspense fallback={<div className="text-center">Loading layout...</div>}>
        <CollectionLayout>
          <div>
            <SideBar />
          </div>
          {data?.products?.length === 0 ? (
            <div className="text-center">No products found</div>
          ) : (
            <div className="max-w-full mx-auto">
              <ProductLayout data={data} />
            </div>
          )}
        </CollectionLayout>
      </Suspense>
    </div>
  );
};

export default Collection;
