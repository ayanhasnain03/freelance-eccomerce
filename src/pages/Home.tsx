import ProductCarousel from "../components/Carousel/HomeCarousel";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-primaryBg">
      <div className=" w-full border h-[80vh] px-4 sm:px-6 lg:px-8 flex items-center justify-center">

 <ProductCarousel/>
      </div>
    </div>
  );
};

export default Home;
