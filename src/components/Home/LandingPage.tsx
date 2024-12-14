import { lazy } from "react";
import { motion } from "framer-motion";  
const MobileLandingPage = lazy(() => import("./MobileLandingPage"));

const LandingPage = () => {
  return (
    <div className="bg-white text-black max-w-7xl mx-auto">
      <div className="flex flex-row justify-around gap-8 mt-5">
        
        {/* Left Image */}
        <motion.div
          className="hidden h-[550px] w-1/4 md:flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }}    
          transition={{ duration: 1 }}     
        >
          <img
            src="hero.webp"
            alt="Featured Product"
            className="object-cover h-full w-full filter grayscale hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>

        {/* Center Content */}
        <motion.div
          className="hidden h-[550px] w-1/2 md:flex flex-col items-center justify-between"
          initial={{ opacity: 0, y: 50 }}  
          animate={{ opacity: 1, y: 0 }}    
          transition={{ duration: 1 }}    
        >
          {/* Top Image */}
          <motion.div
            className="h-1/3 w-full"
            initial={{ opacity: 0, x: -50 }}  
            animate={{ opacity: 1, x: 0 }}    
            transition={{ duration: 1 }}
          >
            <img
              src="hero3.webp"
              alt="Exclusive Offers"
              className="object-cover h-full w-full"
            />
          </motion.div>

          {/* Text and Button */}
          <div className="text-center text-black px-8 flex flex-col gap-2">
            <motion.h1
              className="main-title font-agu text-4xl"
              initial={{ opacity: 0, y: 50 }}  
              animate={{ opacity: 1, y: 0 }}   
              transition={{ duration: 0.6 }}
            >
              Unleash Your Style
            </motion.h1>
            <motion.p
              className="text-[15px] mt-1 font-inter"
              initial={{ opacity: 0, y: 50 }}  
              animate={{ opacity: 1, y: 0 }}   
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our exclusive collection of fashion. Free shipping on orders over $50!
            </motion.p>
            <motion.button
              className="font-inter underline text-semibold text-rose-600 transition duration-300"
              whileHover={{ scale: 1.05 }}   
              transition={{ duration: 0.3 }}
            >
              Shop Now
            </motion.button>
          </div>

          {/* Bottom Image */}
          <motion.div
            className="h-1/3 w-full"
            initial={{ opacity: 0, x: 50 }}  
            animate={{ opacity: 1, x: 0 }}   
            transition={{ duration: 0.8 }}
          >
            <img
              src="hero4.webp"
              alt="Exclusive Offers"
              className="object-cover h-full w-full"
            />
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="hidden md:block h-[550px] w-1/4"
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }}   
          transition={{ duration: 1 }}
        >
          <img
            src="hero2.webp"
            alt="New Arrivals"
            className="object-cover h-full filter grayscale hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>
      </div>

      <MobileLandingPage />
    </div>
  );
};

export default LandingPage;
