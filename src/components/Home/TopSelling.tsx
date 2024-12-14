
import { lazy } from "react";
const ProductCard = lazy(() => import("../cards/product/ProductCard"));
import {motion} from 'framer-motion'
import { Link } from "react-router-dom";

const TopSelling = () => {
  const data = [
    {
      id: "1",
      name: "Casual Cotton T-Shirt",
      description:
        "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      image: "menCat3.jpg",
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
    {
      id: "5",
      name: "Floral Summer Dress",
      description:
        "A vibrant summer dress with floral patterns for a breezy look.",
      price: 55,
      image: "card.png",
      rating: 4.6,
    },
    {
      id: "6",
      name: "Floral Summer Dress",
      description:
        "A vibrant summer dress with floral patterns for a breezy look.",
      price: 55,
      image: "card.png",
      rating: 4.6,
    },
    {
      id: "7",
      name: "Floral Summer Dress",
      description:
        "A vibrant summer dress with floral patterns for a breezy look.",
      price: 55,
      image: "card.png",
      rating: 4.6,
    },
    {
      id: "8",
      name: "Floral Summer Dress",
      description:
        "A vibrant summer dress with floral patterns for a breezy look.",
      price: 55,
      image: "card.png",
      rating: 4.6,
    },
  ];
  return (
    <motion.div className="flex flex-col gap-2 mt-2 h-full  w-full items-center  justify-center relative"
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.8 }} 
    
    >



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 relative">
        {data.map((item) => (
          //@ts-ignore
          <ProductCard key={item.id} productId={item.id} name={item.name} image={item.image}  discount={0} price={item.price} rating={item.rating} isFav={true} isCart={false} handleFav={() => {}} removeFromFav={() => {}}/>
        ))}

      </div>
      <p className='text-center'>
        <Link
          to="/collections"
          className="text-slate-600 hover:text-slate-800 transition underline duration-300"
        >
         More
        </Link>
      </p>
    </motion.div>
  );
};

export default TopSelling;
