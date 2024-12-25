import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";

import { useGetTopSellingProductQuery } from "../../redux/api/productApi";
import Skeleton from "../shared/Skeleton"; // Replace with your skeleton loader component

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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Top-Selling Products
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Explore the best-selling products from our store.
        </p>
      </div>

   
      <Suspense fallback={<Skeleton quantity={3} />}>
        {isLoading ? (
          <Skeleton quantity={4} />
        ) : (
          <div className="w-full flex flex-wrap justify-center gap-4">
            <ProductLayout data={data} />
          </div>
        )}
      </Suspense>
    </motion.div>
  );
};

export default TopSelling;
