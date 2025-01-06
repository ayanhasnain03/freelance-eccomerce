import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";

import { useGetTopSellingProductQuery } from "../../redux/api/productApi";
import Skeleton from "../shared/Skeleton";

import Highlighter from "../shared/Highlight";
import Stbtn from "../shared/Buttons/Stbtn";

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
      className="flex flex-col gap-6 mt-6 w-full items-center justify-center relative "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center justify-center">
        <Stbtn text="Top Selling" />
        <p className="">
          Explore the  <Highlighter animationDuration={1} text="Top Selling"  strokeWidth={8} lineStyle="strikethrough" lineColor="#F39EA2"/> products from our store.
        </p>
      </div>

     
      {isLoading ? (
        <Skeleton quantity={4} />
      ) : (
       
        <Suspense fallback={<Skeleton quantity={3} />}>
          <div className="w-full flex flex-wrap justify-center gap-4 md:mr-8">
            {data && <ProductLayout data={data} />}
          </div>
        </Suspense>
      )}
    </motion.div>
  );
};

export default TopSelling;
