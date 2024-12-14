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

  // Dummy related products data
  const relatedProducts = [
    {
      _id: "1",
      name: "Product 1",
      description: "This is a description for product 1",
      price: 1200,
      images: [{ url: "https://via.placeholder.com/500" }],
    },
    {
      _id: "2",
      name: "Product 2",
      description: "This is a description for product 2",
      price: 1500,
      images: [{ url: "https://via.placeholder.com/500" }],
    },
    {
      _id: "3",
      name: "Product 3",
      description: "This is a description for product 3",
      price: 800,
      images: [{ url: "https://via.placeholder.com/500" }],
    },
    {
      _id: "4",
      name: "Product 4",
      description: "This is a description for product 4",
      price: 1300,
      images: [{ url: "https://via.placeholder.com/500" }],
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="max-w-7xl flex flex-col md:flex-row md:gap-8 md:mt-10 items-center md:items-start justify-between px-8 overflow-x-hidden">
            {/* Product Image Section */}
            <div className="w-full my-4">
              <motion.div
                className="flex justify-center items-center md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt={product?.name}
                    className="rounded-lg shadow-lg w-[400px] h-[400px] object-contain"
                    width="400"
                    height="400"
                  />
                )}
              </motion.div>

              <motion.div
                className="hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt={product?.name}
                    className="rounded-lg shadow-lg w-[500px] h-[500px] object-contain"
                    width="500"
                    height="500"
                  />
                )}
              </motion.div>

              <div className="flex flex-row gap-4 px-4 my-6 overflow-x-hidden">
                {product?.images?.map((image: any) => (
                  <motion.img
                    key={image.url}
                    src={image.url}
                    alt={product?.name}
                    className={`w-20 h-20 object-cover cursor-pointer rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105 ${
                      image.url === selectedImage
                        ? "border-4 border-teal-600"
                        : "border-2 border-transparent"
                    }`}
                    onClick={() => setSelectedImage(image.url)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    width="80"
                    height="80"
                  />
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col md:mt-10 px-4 md:px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl text-gray-900 mb-2">{product?.name}</h1>
              <p className="text-sm text-gray-600 mt-1">{product?.description || "Loading..."}</p>
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-green-600 my-2">
                  Price: ₹{product?.price}
                </p>
                <p className="text-sm text-rose-500">-30% off</p>
              </div>

              <div className="flex items-center">
                <Star rating={product?.rating} size="md" />
                <span className="text-gray-700">({product?.numReviews} reviews)</span>
              </div>

              <p className="text-lg text-gray-700">
                <label htmlFor="stock">Stock:</label>
                {product?.stock > 0 ? `${product?.stock} items available` : "Out of Stock"}
              </p>

              <p className="text-lg text-gray-700">
                <label htmlFor="brand">Brand:</label> {product?.brand}
              </p>

              {/* Size Selection */}
              <div className="w-full flex flex-col gap-4 mt-6">
                <label htmlFor="sizes" className="text-lg font-medium text-gray-700 mb-2">
                  Choose Size
                </label>
                <div className="flex flex-wrap gap-4">
                  {product?.sizes?.map((size: any) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-8 h-8 flex items-center justify-center border-2 rounded-md transition-transform duration-300 transform hover:scale-105 ${
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

              {/* Add to Cart Button */}
              <AddToCart
                productName={product?.name}
                price={product?.price}
                sizes={selectedSize}
                _id={product?._id}
                image={product?.images[0]?.url}
                stock={product?.stock}
                quantity={1}
              />
            </motion.div>
          </div>

          {/* Related Products Section */}
          {/* {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
              <div className="flex flex-wrap gap-6">
                {relatedProducts.map((relatedProduct: any) => (
                  <motion.div
                    key={relatedProduct._id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={relatedProduct.images[0]?.url}
                        alt={relatedProduct.name}
                        className="w-full h-56 object-cover mb-4 rounded-lg"
                      />
                      <h3 className="text-lg font-medium text-gray-800">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-600 my-2">{relatedProduct.description}</p>
                      <p className="text-xl font-bold text-green-600">₹{relatedProduct.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      )}
    </>
  );
};

export default ProductPage;
