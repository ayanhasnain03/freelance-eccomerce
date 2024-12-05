import ProductCard from "../cards/product/ProductCard";

const NewArrivals = () => {
  const data = [
    {
      id: "1",
      name: "Casual Cotton T-Shirt",
      description:
        "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      image: "arrival1.png",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      description: "Stylish slim-fit jeans crafted from high-quality denim.",
      price: 40,
      image: "arrival2.png",
      rating: 4.2,
    },
    {
      id: "3",
      name: "Leather Jacket",
      description:
        "Premium leather jacket with a modern design for all seasons.",
      price: 120,
      image: "arrival3.png",
      rating: 4.8,
    },
    {
      id: "4",
      name: "Floral Summer Dress",
      description:
        "A vibrant summer dress with floral patterns for a breezy look.",
      price: 55,
      image: "card.png",
      rating: 4.6,
    },
  ];
  return (
    <div className="flex flex-col gap-8 my-4 h-full w-full items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            productId={item.id}
            name={item.name}
            image={item.image}
            discount={0}
            price={item.price}
            rating={item.rating}
            isFav={true}
            isCart={false}
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
