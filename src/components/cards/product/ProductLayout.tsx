import React from "react";
import ProductCard from "./ProductCard";

const ProductLayout = () => {
  const data = [
    {
      id: "1",
      name: "Casual Cotton T-Shirt",
      description: "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      image: "card.png",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      description: "Stylish slim-fit jeans crafted from high-quality denim.",
      price: 40,
      image: "card.png",
      rating: 4.2,
    },
    {
      id: "3",
      name: "Leather Jacket",
      description: "Premium leather jacket with a modern design for all seasons.",
      price: 120,
      image: "card.png",
      rating: 4.8,
    },
    {
      id: "4",
      name: "Floral Summer Dress",
      description: "A vibrant summer dress with floral patterns for a breezy look.",
      price: 55,
      image: "card.png",
      rating: 4.6,
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          rating={product.rating}
          discount={10}
          productId={product.id}
          isFav={false}
          isCart={false}
        />
      ))}
    </div>
  );
};

export default React.memo(ProductLayout);

