import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { useGetSaleProductsQuery } from "../../redux/api/productApi";
import Loader from "../shared/Loader/Loader";

const ProductLayout = React.lazy(
  () => import("../cards/product/ProductLayout")
);
const CountdownTimer = React.lazy(
  () => import("../shared/TImer/CountdownTimer")
);
const Highlighter = React.lazy(() => import("../shared/Highlight"));
const Stbtn = React.lazy(() => import("../shared/Buttons/Stbtn"));

const SaleProducts = () => {
  const { data, isLoading } = useGetSaleProductsQuery("");

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative bg-white rounded-3xl  p-8 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute -top-6 right-8">
            <CountdownTimer saleDate="30-1-2025" />
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Stbtn text="New Year Mega Sale" />
            </motion.div>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-gray-700 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Highlighter
                text="Start the year with a bang!"
                strokeWidth={8}
                lineStyle="strikethrough"
                lineColor="#F39EA2"
              />{" "}
              Enjoy a huge{" "}
              <Highlighter
                text="30% off"
                lineStyle="strikethrough"
                strokeWidth={8}
                lineColor="#F39EA2"
              />{" "}
              on all products! Don't miss out on exclusive deals and discounts.
            </motion.p>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader />
              </div>
            }
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-full flex flex-wrap justify-center gap-4 md:mr-8"
            >
              <ProductLayout data={data} />
            </motion.div>
          </Suspense>
        )}
      </div>
    </motion.div>
  );
};

export default SaleProducts;
