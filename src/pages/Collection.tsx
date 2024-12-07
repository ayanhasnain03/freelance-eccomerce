import { lazy, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import SideBar from "../components/collections/SideBar";
import ProductLayout from "../components/cards/product/ProductLayout";
import { useGetProductsQuery } from "../redux/api/productApi";

// Lazy load the CollectionLayout component
const CollectionLayout = lazy(() => import("../components/layouts/CollectionLayout"));

const Collection = () => {
  const { categories, price } = useSelector((state: { product: { categories: string[]; price: { min: number; max: number }[] } }) => state.product);

  // Memoized values to prevent recalculations
  const category = useMemo(() => (categories.length > 0 ? categories.join(",") : ""), [categories]);
  const priceRanges = useMemo(
    () => (price.length > 0 ? price.map((range) => `${range.min}-${range.max}`).join(",") : ""),
    [price]
  );

  // Fetch products data
  const { data, error, isLoading } = useGetProductsQuery({ category, priceRanges });

  // Loading state
  if (isLoading) {
    return <div className="text-center">Loading products...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center text-red-500">Error loading products </div>;
  }

  // Render
  return (
    <div className="flex flex-col md:flex-row">
      <Suspense fallback={<div className="text-center">Loading layout...</div>}>
        <CollectionLayout>
          <SideBar />
          <div className="md:flex-1 mt-10 mx-auto">
            <ProductLayout data={data} />
          </div>
        </CollectionLayout>
      </Suspense>
    </div>
  );
};

export default Collection;
