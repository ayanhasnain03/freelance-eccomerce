import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: "banner1.webp",
      title: "Exclusive 50% Discount",
      description: "Grab your favorite products at half the price.",
      link: "/shop-now",
    },
    {
      image: "banner2.webp",
      title: "Free Shipping Worldwide",
      description: "Shop from anywhere without extra charges.",
      link: "/free-shipping",
    },
    {
      image: "https://via.placeholder.com/1200x600.png?text=Premium+Deal+3",
      title: "New Season Collection",
      description: "Discover the latest styles and trends.",
      link: "/new-collection",
    },
    {
      image: "https://via.placeholder.com/1200x600.png?text=Premium+Deal+4",
      title: "Flash Sale is Live",
      description: "Hurry! Limited-time offers await you.",
      link: "/flash-sale",
    },
  ];

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div
      className="relative w-full h-[70vh] md:h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden"
      role="region"
      aria-label="Home Carousel"
    >
      {/* Slides */}
      <div className="absolute w-full h-full">
        <AnimatePresence>
          {slides.map(
            (slide, index) =>
              index === currentIndex && (
                <motion.div
                  key={index}
                  className="absolute w-full h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover brightness-75"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-24 z-10">
        <motion.h1
          className="text-2xl md:text-5xl font-integral  mb-4 text-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {slides[currentIndex].title}
        </motion.h1>
        <motion.p
          className="text-sm md:text-lg mb-6 md:mb-8 font-satoshi text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {slides[currentIndex].description}
        </motion.p>
        <motion.a
          href={slides[currentIndex].link}
          className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:scale-105 transform transition-transform text-sm md:text-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Shop Now
        </motion.a>
      </div>

      {/* Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            } cursor-pointer transition transform hover:scale-110`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
