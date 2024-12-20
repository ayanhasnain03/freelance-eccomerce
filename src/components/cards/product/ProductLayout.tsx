import React, { useMemo, useCallback } from "react";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  description: string;
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
  const handleFav = useCallback((id: string) => {
    console.log(`Added to favorites: ${id}`);
  }, []);

  const removeFromFav = useCallback((id: string) => {
    console.log(`Removed from favorites: ${id}`);
  }, []);

  const productCards = useMemo(
    () =>
      data?.products.map((product) => (
        //@ts-ignore
        <ProductCard
          description={product?.description}
          key={product._id}
          name={product.name}
          price={product.price}
          image={product.images[0].url}
          rating={product.rating}
          discount={10}
          productId={product._id}
          isFav={true}
          handleFav={handleFav}
          removeFromFav={removeFromFav}
          isCart={false}
        />
      )),
    [data, handleFav, removeFromFav]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-full">
      {productCards}
    </div>
  );
};

export default React.memo(ProductLayout);
