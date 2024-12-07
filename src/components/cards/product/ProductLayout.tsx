import React, { useMemo, useCallback } from "react";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: { url: string }[];
  rating: number;
}

interface ProductLayoutProps {
  data: {
    products: Product[];
  };
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ data }) => {
  // Memoized functions to avoid recreation on re-renders
  const handleFav = useCallback((id: string) => {
    console.log(`Added to favorites: ${id}`);
  }, []);

  const removeFromFav = useCallback((id: string) => {
    console.log(`Removed from favorites: ${id}`);
  }, []);

  // Memoize the mapped product cards
  const productCards = useMemo(
    () =>
      data?.products.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          price={product.price}
          image={product.images[0].url}
          rating={product.rating}
          discount={10} // Consider making this dynamic if needed
          productId={product._id}
          isFav={true}
          handleFav={handleFav}
          removeFromFav={removeFromFav}
          isCart={false}
        />
      )),
    [data, handleFav, removeFromFav]
  );

  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">{productCards}</div>;
};

export default React.memo(ProductLayout);
