import { lazy } from "react";
import { motion } from "framer-motion";
import Highlighter from "../shared/Highlight";
import { Link } from "react-router-dom";
import Helm from "../Helm";

const MobileLandingPage = lazy(() => import("./MobileLandingPage"));

const LandingPage = () => {
  return (
    <div className="bg-white text-black max-w-7xl mx-auto">
          <Helm
        title="Fash Alt - Fashion for Everyone"
        description="Discover the latest fashion trends at Fash Alt. Shop for clothing, shoes, and accessories at unbeatable prices."
        keywords="fashion, online shopping, clothing, shoes, accessories, fashion trends, women's fashion, men's fashion, latest fashion, stylish clothing, trendy accessories"
        image="https://freelance-eccomerce.vercel.app/hero.webp"
        url="https://freelance-eccomerce.vercel.app"
      />
      <div className="flex flex-row justify-around gap-8 mt-5">
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

        <motion.div
          className="hidden h-[550px] w-1/2 md:flex flex-col items-center justify-between"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
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

          <div className="text-center text-black px-8 flex flex-col gap-2">
            <motion.h1
              className="main-title font-agu text-4xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Unleash Your Style
            </motion.h1>

            <motion.div
              className="text-xl mt-1 font-inter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our exclusive {"  "}
              <Highlighter
                text="collection"
                opacity={1.5}
                strokeWidth={8}
                lineStyle="strikethrough"
                lineColor="#F39EA2"
              />
              {"  "}
              of fashion. Free{" "}
              <Highlighter
                text="shipping"
                opacity={1.5}
                strokeWidth={8}
                lineStyle="strikethrough"
                lineColor="#F39EA2"
              />{" "}
              on orders over $50!
            </motion.div>

            <Link to="/collections/womens">
              <motion.button
                className="font-inter underline text-semibold text-rose-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Shop Now
              </motion.button>
            </Link>
          </div>

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
