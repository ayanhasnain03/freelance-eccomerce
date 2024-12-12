import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApi";
import { motion } from "framer-motion";
import Star from "../components/cards/Star";
//@ts-ignore
import ReactImageZoom from "react-image-zoom"; // Import React Image Zoom
import AddToCart from "../components/shared/Buttons/AddToCart";

const ProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (data?.product) {
      setSelectedImage(data.product.images[0]?.url);
      setSelectedSize(data.product.sizes[0]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="text-center py-10 text-xl text-teal-600">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Error loading product details
      </div>
    );
  }



  return (
    <div className="container mx-auto  overflow-hidden">
      <div className="flex flex-col md:flex-row md:gap-8 md:mt-10 items-center md:items-start   justify-between">
        {/* Product Images */}
        <div className="w-full my-4">
          <div className="md:hidden">
         {selectedImage && (
  <motion.div
    className=" flex justify-center items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={selectedImage}
      alt={data?.product?.name}
        className="rounded-lg shadow-lg w-[400px] h-[400px] object-contain md:object-cover"
    />
  </motion.div>
)}

          </div>

<div className="">
    {
        selectedImage && (
           <motion.div
                className="w-full h-full hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={selectedImage}
                  alt={data?.product?.name}
                  className="rounded-lg shadow-lg w-[500px] h-[500px] object-contain md:object-cover"
                />
              </motion.div>
        )
    }

    <div>
              <div className="flex flex-row gap-4 px-4 my-6">
            {data?.product?.images?.map((image: any) => {
              if (image.url === selectedImage) {
                return null;
              }
              return (
                <motion.img
                  key={image.url}
                  src={image.url}
                  alt={data?.product?.name}
                  className={`w-20 h-20 object-cover cursor-pointer transition-all duration-300 transform hover:scale-105 rounded-lg shadow-sm ${
                    image.url === selectedImage
                      ? "border-4 border-teal-600"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </div>
        </div>
    </div>
</div>



        {/* Product Info */}
        <motion.div
          className="w-full md:w-1/2 flex  flex-col md:mt-10 ml-3 md:ml-0 px-4 md:px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl  text-gray-900 mb-2 font-candal">
            {data?.product?.name}
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-satoshi">
            {data?.product?.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
          </p>
         <div className="flex items-center gap-4">
             <p className="text-xl font-bold text-green-600 my-2">
            Price: ₹{data?.product?.price}
          </p>
          <p className="text-sm text-rose-500 font-satoshi">-30% off</p>
         </div>

          {/* Rating Display */}
          <div className="flex items-center">
            <Star rating={data?.product?.rating} size="md" />
            <span className="text-gray-700">
              ({data?.product?.numReviews} reviews)
            </span>
          </div>

          <p className="text-lg text-gray-700 flex gap-2 font-satoshi">
            <label htmlFor="stock">Stock:</label>
              {data?.product?.stock > 0
              ? `${data?.product?.stock} items available`
              : "Out of Stock"}
          </p>

      <div>
        <p className="text-lg text-gray-700 font-satoshi">
          <label htmlFor="brand">
            Brand:</label> {data?.product?.brand}
        </p>
      </div>

<div className="w-full flex flex-col gap-4 mt-6">
  <label htmlFor="sizes" className="text-lg font-medium text-gray-700 mb-2">
    Choose Size
  </label>

  <div className="flex flex-wrap gap-4">
    {data?.product?.sizes?.map((size: any) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-md transition-all duration-300 ease-out transform hover:scale-105 ${
          selectedSize === size
            ? "bg-teal-600 text-white border-teal-600"
            : "bg-white text-teal-600 hover:bg-teal-100"
        }`}
      >
        {size}
      </button>
    ))}
  </div>
</div>



    <AddToCart productName={data?.product?.name} price={data?.product?.price} sizes={selectedSize} _id={data?.product?._id}  image={data?.product?.images[0].url} stock={data?.product?.stock} quantity={1} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
