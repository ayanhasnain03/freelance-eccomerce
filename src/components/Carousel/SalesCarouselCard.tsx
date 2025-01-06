import { motion } from "framer-motion";
import { useGetSaleProductsQuery } from "../../redux/api/productApi";
import React, { Suspense } from "react";
import Loader from "../shared/Loader/Loader"; 

const ProductLayout = React.lazy(() => import('../cards/product/ProductLayout'));
const CountdownTimer = React.lazy(() => import('../shared/TImer/CountdownTimer'));
const Highlighter = React.lazy(() => import('../shared/Highlight'));
const Stbtn = React.lazy(() => import('../shared/Buttons/Stbtn'));

const SaleProducts = () => {
  const { data, isLoading } = useGetSaleProductsQuery('');

  return (
    <motion.div
      className="h-auto w-full mt-10 p-6 text-center relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
<div className="absolute top-16 left-10 ">
<CountdownTimer  saleDate="30-1-2025" />
</div>
<div className="mt-10">

<div className="">
  <Stbtn text="New Year Mega Sale" />
  <p className="mb-4">
    <Highlighter text="Start the year with a bang!" strokeWidth={8} lineStyle="strikethrough" lineColor="#F39EA2" />
    {" "}Enjoy a huge{" "}
    <Highlighter text="30% off"  lineStyle="strikethrough" strokeWidth={8} lineColor="#F39EA2" />
    {" "}on all products! Don't miss out on exclusive deals and discounts.
  </p>
</div>



</div>
    
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader /> 
        </div>
      ) : (
        <Suspense fallback={<Loader />}>
          <div>
            <ProductLayout data={data} />
          </div>
        </Suspense>
      )}
    </motion.div>
  );
};

export default SaleProducts;
