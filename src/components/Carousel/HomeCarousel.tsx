import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1714226830923-03396831c4f0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
  ];

  const cardContent = [
    {
      title: "Premium Quality",
      description: "Our collection is handpicked for the best quality.",
      link: "#shop-now",
    },
    {
      title: "Exclusive Designs",
      description: "Get access to exclusive and limited edition designs.",
      link: "#explore",
    },
    {
      title: "Affordable Prices",
      description: "Best prices for top-notch products, only for you.",
      link: "#deals",
    },
    {
      title: "Fast Shipping",
      description: "Enjoy quick and reliable shipping with every order.",
      link: "#shipping",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      if (progress === 100) {
        nextSlide();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-full py-16 flex justify-center items-center h-[90vh]">
      <div className="relative w-full max-w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-800 via-slate-400 to-gray-600 rounded-lg shadow-2xl overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-0 right-0 text-center z-10 transform -translate-y-1/2 px-4 sm:px-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-candal text-white mb-4 drop-shadow-xl">
            {cardContent[currentIndex].title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 drop-shadow-lg font-noto">
            {cardContent[currentIndex].description}
          </p>
          <Link
            to={cardContent[currentIndex].link}
            className="text-xl sm:text-2xl text-white underline hover:text-slate-200 transition-all duration-300"
          >
            Explore Now
          </Link>
        </motion.div>

        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md brightness-[80%] contrast-125"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>


          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-2 bg-gradient-to-r from-slate-800 to-black rounded-full shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-white to-silver rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 z-10">
            <motion.button
              onClick={prevSlide}
              className="p-4 bg-white rounded-full shadow-lg text-black hover:bg-slate-200 transition-all duration-300"
            >
              <FaChevronLeft className="text-2xl" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="p-4 bg-white rounded-full shadow-lg text-black hover:bg-slate-200 transition-all duration-300"
            >
              <FaChevronRight className="text-2xl" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCarousel;
