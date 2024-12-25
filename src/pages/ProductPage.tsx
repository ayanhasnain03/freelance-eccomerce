import React, { useState, useEffect, lazy, memo, Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteReviewMutation,
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
  useGetReviewsQuery,
} from "../redux/api/productApi";
import { motion } from "framer-motion";

import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Skeleton from "../components/shared/Skeleton";
import { useSelector } from "react-redux";

const Star = lazy(() => import("../components/cards/Star"));
const AddToCart = lazy(() => import("../components/shared/Buttons/AddToCart"));
const ReviewModal = lazy(() => import("../components/shared/ReviewModal"));
const ProductLayout = lazy(
  () => import("../components/cards/product/ProductLayout")
);
const AnimText = lazy(() => import("../components/shared/AnimText"));

interface ReviewActionsProps {
onDelete: () => void;
isAuthor: boolean
}

const ReviewActions: React.FC<ReviewActionsProps> = memo(({ onDelete,isAuthor  }: any) => {


  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">


{
  isAuthor && (
    <button
    onClick={toggleMenu}
    className="text-gray-600 hover:text-gray-800"
  >
    <FaEllipsisV />
  </button>
  )
}
 

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
});

const ProductPage: React.FC = () => {
  const existUserId = useSelector((state: any) => state.user.user._id);


  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const { id } = useParams<{ id: string }>();
  const { data: productData, isLoading, isError } = useGetProductByIdQuery(id);
  const { data: reviews, isLoading: reviewLoading } = useGetReviewsQuery(id);

  const categoryId = productData?.product?.category?._id;
  const { data: relatedProductsData } = useGetRelatedProductsQuery(
    categoryId || ""
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (productData?.product) {
      setSelectedImage(productData.product?.images?.[0]?.url || null);
      setSelectedSize(productData.product?.sizes?.[0] || null);
    }
  }, [productData]);

  if (isError) {
    toast.error("Error loading product details!");
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Error loading product details
      </div>
    );
  }

  const product = productData?.product;
  const relatedProducts =
    relatedProductsData?.products?.filter(
      (item: any) => item._id !== product?._id
    ) || [];


  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete review.");
    }
  };

  return (
    <Suspense fallback={<Skeleton quantity={5} />}>
      {isLoading ? (
        <Skeleton quantity={5} />
      ) : (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4 md:px-8 py-10">
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
                    className="w-full md:w-[500px] h-[500px] object-contain transition-transform duration-300"
                  />
                )}
              </motion.div>

              <div className="flex gap-2 px-4 overflow-x-auto">
                {product?.images?.map((image: { url: string }) => (
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
              className="w-full md:w-1/2 flex flex-col px-4 md:px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                {product?.name}
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                {product?.description || "Loading..."}
              </p>

              <div className="flex items-center gap-6 mb-4">
                <p className="text-2xl font-bold text-green-600">
                  ₹{product?.price}
                </p>
                <p className="text-lg text-rose-500">-30% off</p>
              </div>

              <div className="flex items-center mb-6">
                <Star rating={product?.rating} size="md" />
                <span className="ml-2 text-gray-700">
                  ({product?.numReviews} reviews)
                </span>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                <strong>Stock:</strong>{" "}
                {product?.stock > 0
                  ? `${product?.stock} items available`
                  : "Out of Stock"}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                <strong>Brand:</strong> {product?.brand}
              </p>

              <div className="w-full flex flex-col gap-4 mt-6">
                <label
                  htmlFor="sizes"
                  className="text-lg font-medium text-gray-700 mb-2"
                >
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
                  image={product?.images?.[0]?.url}
                  stock={product?.stock}
                  quantity={1}
                />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center justify-center mx-auto w-full mt-8">
            <AnimText
              text="Related Products"
              fontSize="3xl"
              fontWeight="bold"
            />
            <div className="w-full flex flex-col md:flex-row items-center mt-10 flex-wrap justify-center px-8">
              <ProductLayout data={{ products: relatedProducts }} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mx-auto w-full mt-10 px-8">
            <AnimText
              text="Customer Reviews"
              fontSize="3xl"
              fontWeight="bold"
            />
            <div className="mt-10 gap-4 flex flex-col md:flex-row flex-wrap flex-1 items-center  w-full">
              {reviewLoading || isDeleting ? (
                <Skeleton quantity={3} />
              ) : (
                reviews?.reviews?.map((review: any) => (
         <>
                  <motion.div
                    key={review._id}
                    className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-all hover:scale-105 transform"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={review?.user?.avatar[0]?.url}
                          alt="avatar"
                          className="w-12 h-12 rounded-full border-2 border-teal-600"
                        />
                        <div>
                          <span className="font-semibold text-lg text-gray-800">
                            {review.user.name}
                          </span>
                          <div className="flex items-center mt-1">
                            <Star rating={review.rating} size="sm" />
                          </div>
                        </div>
                      </div>

                      <div className="ml-auto">
                        <ReviewActions
                          isAuthor={review?.user?._id === existUserId}
                          onDelete={() => handleDeleteReview(review._id)}
                        />
                      </div>
                    </div>

                    <p className="text-gray-800 leading-relaxed">
                      {review.comment}
                    </p>

                    {review?.image[0]?.url && (
                      <img
                        src={review?.image[0]?.url}
                        alt="Review Image"
                        className="mt-4 w-full h-[200px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
                      />
                    )}
                  </motion.div>

             
         
         </>
                ))
              )}
            </div>
            <button
              onClick={openReviewModal}
              className="mt-8 py-2 px-6 bg-teal-600 text-white rounded-md shadow-md transition-all hover:bg-teal-700 hover:scale-105"
            >
              Write a Review
            </button>
          </div>

          <ReviewModal
            productId={id as string}
            isOpen={isReviewModalOpen}
            closeModal={closeReviewModal}
            //@ts-ignore
            onClose={closeReviewModal}
          />
        </div>
      )}
    </Suspense>
  );
};

export default ProductPage;
