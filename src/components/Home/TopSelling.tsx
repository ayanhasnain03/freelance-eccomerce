import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";

import { useGetTopSellingProductQuery } from "../../redux/api/productApi";
import Skeleton from "../shared/Skeleton";
import AnimText from "../shared/AnimText";
import Highlighter from "../shared/Highlight";

const ProductLayout = lazy(() => import("../cards/product/ProductLayout"));

const TopSelling: React.FC = () => {
  const { data, isLoading, isError } = useGetTopSellingProductQuery("");

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load top-selling products. Please try again later.
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col gap-6 mt-6 w-full items-center justify-center relative px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center justify-center">
        <AnimText text="Top Selling" fontSize="3xl" fontFamily="dancing" />
        <p className="text-gray-600 text-sm md:text-base mt-4">
          Explore the Top <Highlighter animationDuration={1} text="Selling" /> products from our store.
        </p>
      </div>

     
      {isLoading ? (
        <Skeleton quantity={4} />
      ) : (
       
        <Suspense fallback={<Skeleton quantity={3} />}>
          <div className="w-full flex flex-wrap justify-center gap-4">
            {data && <ProductLayout data={data} />}
          </div>
        </Suspense>
      )}
    </motion.div>
  );
};

export default TopSelling;
