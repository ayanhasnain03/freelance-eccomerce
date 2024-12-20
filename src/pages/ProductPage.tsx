import { useState, useEffect, lazy } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApi";
import { motion } from "framer-motion";
const Star = lazy(() => import("../components/cards/Star"));
const AddToCart = lazy(() => import("../components/shared/Buttons/AddToCart"));
const Loader = lazy(() => import("../components/shared/Loader/Loader"));

const ProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (data?.product) {
      setSelectedImage(data.product.images[0]?.url || null);
      setSelectedSize(data.product.sizes[0] || null);
    }
  }, [data]);

  if (isError) {
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Error loading product details
      </div>
    );
  }

  const product = data?.product;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white">
          <div className="max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-10 overflow-x-hidden">

         
            <div className="w-full md:w-1/2 flex flex-col items-center">
 
              <motion.div
                className="flex justify-center items-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt={product?.name}
                    className=" w-full md:w-[500px] h-[500px] object-contain transition-transform duration-300"
                  />
                )}
              </motion.div>

             
              <div className="flex gap-4 px-4 overflow-hidden">
                {product?.images?.map((image: any) => (
                  <motion.img
                    key={image.url}
                    src={image.url}
                    alt={product?.name}
                    className={`w-20 h-20 object-cover cursor-pointer rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-110 ${
                      image.url === selectedImage
                        ? "border-4 border-teal-600"
                        : "border-2 border-transparent"
                    }`}
                    onClick={() => setSelectedImage(image.url)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>

            
            <motion.div
              className="w-full md:w-1/2 flex flex-col  px-4 md:px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">{product?.name}</h1>
              <p className="text-sm text-gray-600 mb-6">{product?.description || "Loading..."}</p>

              {/* Price and Discount */}
              <div className="flex items-center gap-6 mb-4">
                <p className="text-2xl font-bold text-green-600">₹{product?.price}</p>
                <p className="text-lg text-rose-500">-30% off</p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <Star rating={product?.rating} size="md" />
                <span className="ml-2 text-gray-700">({product?.numReviews} reviews)</span>
              </div>

              {/* Stock & Brand */}
              <p className="text-lg text-gray-700 mb-4">
                <strong>Stock:</strong> {product?.stock > 0 ? `${product?.stock} items available` : "Out of Stock"}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                <strong>Brand:</strong> {product?.brand}
              </p>

        
              <div className="w-full flex flex-col gap-4 mt-6">
                <label htmlFor="sizes" className="text-lg font-medium text-gray-700 mb-2">
                  Choose Size
                </label>
                <div className="flex gap-4">
                  {product?.sizes?.map((size: any) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border-2 rounded-full transition-transform duration-300 transform hover:scale-110 ${
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

             
              <div className="mt-8">
                <AddToCart
                  productName={product?.name}
                  price={product?.price}
                  sizes={selectedSize}
                  _id={product?._id}
                  image={product?.images[0]?.url}
                  stock={product?.stock}
                  quantity={1}
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
