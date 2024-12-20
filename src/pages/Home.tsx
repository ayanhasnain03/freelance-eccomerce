import { lazy } from "react";
import { motion } from "framer-motion";


const LandingPage = lazy(() => import("../components/Home/LandingPage"));
const TopSelling = lazy(() => import("../components/Home/TopSelling"));
const NewArrivals = lazy(() => import("../components/Home/NewArrivals"));
const Stbtn = lazy(() => import("../components/shared/Buttons/Stbtn"));
const SaleProducts = lazy(
  () => import("../components/Carousel/SalesCarouselCard")

);
const WoMenCategory = lazy(() => import("../components/Home/WoMenCategory"));
const MenCategory = lazy(() => import("../components/Home/MenCategory"));

const Home = () => {
  return (
    <div className=" bg-white min-h-screen overflow-x-hidden flex flex-col  justify-center">
      <div className="overflow-hidden">
        <LandingPage />
      </div>

      <div>
        <NewArrivals />
      </div>

      <div>
        <SaleProducts />
      </div>

      <div className="overflow-hidden mt-6">
        <Stbtn text="Top Selling" />

        <TopSelling />
      </div>

      <div className="flex flex-row items-center justify-center w-full md:p-8">
      
        <motion.div
          className="w-1/2 bg-red-400 h-[400px] flex flex-col items-center justify-center px-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white text-2xl md:text-5xl font-bold font-serif mb-4">
            Elevate Your Style
          </h1>
          <p className="text-white text-lg text-center mb-6">
            Discover the latest trends in fashion with our exclusive collection.
            Premium quality and comfort at unbeatable prices.
          </p>
          <button className="bg-white text-red-400 px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-red-600 hover:text-white">
            Shop Now
          </button>
        </motion.div>

   
        <motion.div
          className="w-1/2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="model.jpg"
            alt="Fashion Model"
            className="w-full h-[400px] object-cover"
          />
        </motion.div>
      </div>




      <div>
        <MenCategory/>
      </div>


      <div>
        <WoMenCategory/>
      </div>
    </div>
  );
};

export default Home;
