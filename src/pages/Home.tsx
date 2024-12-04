// import ProductCarousel from "../components/Carousel/HomeCarousel";

import ProductCard from "../components/cards/product/ProductCard";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-primaryBg">
      <div className=" w-full border h-[80vh] px-4 sm:px-6 lg:px-8 flex items-center justify-center">

 {/* <ProductCarousel/> */}

 <ProductCard name="Levinho Shirt" price={12} discount={30} rating={1.5} image="card.png" productId="1"/>
      </div>
    </div>
  );
};

export default Home;
