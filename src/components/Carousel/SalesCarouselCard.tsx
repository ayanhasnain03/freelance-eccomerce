import { motion } from "framer-motion";

import { useGetSaleProductsQuery } from "../../redux/api/productApi";
import React from "react";

const ProductLayout=React.lazy(() => import('../cards/product/ProductLayout'))
const CountdownTimer=React.lazy(() => import('../shared/TImer/CountdownTimer'))
const Highlighter=React.lazy(() => import('../shared/Highlight'))
const Stbtn=React.lazy(() => import('../shared/Buttons/Stbtn'))

const SaleProducts = () => {
  const {data}=useGetSaleProductsQuery ('');

  return (
    <motion.div
      className="h-auto w-full mt-10 p-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Stbtn text="Christmas Sale " />
     <CountdownTimer saleDate="28-12-2024" /> 

      <div className="text-center mb-8">
        <p className="mt-2 text-lg text-gray-600">
          Exclusive offers and{" "}
         <span>
         <Highlighter animationDuration={1} text="Discounts" />
          </span> just for you!
        </p>
      </div>

   <div>
    <ProductLayout
      data={data}
    />
   </div>
   
    </motion.div>
  );
};

export default SaleProducts;
