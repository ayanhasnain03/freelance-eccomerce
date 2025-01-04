import  {
  useState,
  useEffect,
  lazy,
  memo,
  Suspense,
  useCallback,
} from "react";
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
import ScrollToTopOnReload from "../components/ResetPage";
// import SEO from "../components/shared/SEO";

const Star = lazy(() => import("../components/cards/Star"));
const AddToCart = lazy(() => import("../components/shared/Buttons/AddToCart"));
const ReviewModal = lazy(() => import("../components/shared/ReviewModal"));
const ProductLayout = lazy(() => import("../components/cards/product/ProductLayout"));
const AnimText = lazy(() => import("../components/shared/AnimText"));

const ReviewActions = memo(({ onDelete, isAuthor }: { onDelete: () => void; isAuthor: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {isAuthor && (
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="More actions"
        >
          <FaEllipsisV />
        </button>
      )}

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 z-10"
          role="menu"
        >
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

const ProductPage = () => {
  const existUserId = useSelector((state: any) => state.user.user._id);
  const { id } = useParams<{ id: string }>();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = useCallback(() => setIsReviewModalOpen(false), []);

  const [deleteReview] = useDeleteReviewMutation();
  const { data: productData, isLoading, isError } = useGetProductByIdQuery(id);
  const { data: reviews, isLoading: reviewLoading } = useGetReviewsQuery(id);
  const { data: relatedProductsData } = useGetRelatedProductsQuery(productData?.product?.category?._id || "");

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (productData?.product) {
      setSelectedSize(productData.product?.sizes?.[0] || null);
    }
  }, [productData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (productData?.product?.images?.length) {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % productData.product.images.length);
      }
    }, 3000);
    return () => clearInterval(interval);
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
    relatedProductsData?.products?.filter((item: any) => item._id !== product?._id) || [];
  const discountedPrice = Math.floor(
    product?.price - (product?.price * product?.discount) / 100
  );

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully!");
    } catch {
      toast.error("Failed to delete review.");
    }
  };

  return (
    <Suspense fallback={<Skeleton quantity={5} />}>
      {/* <SEO 
        title={product?.name}
        description={product?.description}
        image={product?.images?.[0]?.url}
      /> */}
      <div className="bg-gray-50 md:min-h-screen px-4 md:px-8">
        <ScrollToTopOnReload />
        {isLoading ? (
          <Skeleton quantity={5} />
        ) : (
          <div className="max-w-7xl mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={product?.images?.[selectedImageIndex]?.url}
                  alt={product?.name}
                  className="w-full md:w-[500px] h-[500px] object-contain rounded-md shadow-lg"
                />

                <div className="flex gap-4 mt-6">
                  {product?.images?.map((image: any, index: number) => (
                    <motion.img
                      key={image.url}
                      src={image.url}
                      alt={product?.name}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-110 ${
                        index === selectedImageIndex
                          ? "border-4 border-teal-500"
                          : "border-2 border-transparent"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {product?.name}
                </h1>
                <p className="text-gray-600 mb-6">{product?.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{discountedPrice}
                  </p>
                  <del className="text-gray-500">₹{product?.price}</del>
                  <span className="text-rose-500">{product?.discount}% off</span>
                </div>

                <div className="flex items-center mb-6">
                  <Star rating={product?.rating} size="md" />
                  <span className="ml-2 text-gray-700">
                    ({product?.numReviews} reviews)
                  </span>
                </div>

                <p className="text-gray-700 mb-4">
                  <strong>Stock:</strong>{" "}
                  {product?.stock > 0 ? `${product?.stock} items available` : "Out of Stock"}
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>Brand:</strong> {product?.brand}
                </p>

                <div className="mb-6">
                  <label htmlFor="sizes" className="block text-lg font-medium text-gray-700 mb-2">
                    Choose Size
                  </label>
                  <div className="flex gap-4">
                    {product?.sizes?.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
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

                <AddToCart
                  productName={product?.name}
                  realPrice={product?.price}
                  price={discountedPrice}
                  sizes={selectedSize}
                  _id={product?._id}
                  image={product?.images?.[0]?.url}
                  stock={product?.stock}
                  quantity={1}
                  discount={product?.discount}
                />
              </div>
            </div>

         
            <div className="mt-16">
              <AnimText text="Related Products" fontSize="2xl" fontWeight="bold" />
             
<div className="mt-10">

<ProductLayout data={{ products: relatedProducts }} />

  </div>         
            </div>

          
            <div className="mt-16">
              <AnimText text="Customer Reviews" fontSize="2xl" fontWeight="bold" />
              <div className="mt-6 grid grid-cols-1 gap-6">
                {reviewLoading ? (
                  <Skeleton quantity={3} />
                ) : (
                  reviews?.reviews?.map((review: any) => (
                    <motion.div
                      key={review._id}
                      className="bg-white shadow-lg rounded-md p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={review?.user?.avatar[0]?.url}
                            alt="avatar"
                            className="w-12 h-12 rounded-full border-2 border-teal-500"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">{review.user.name}</h4>
                            <Star rating={review.rating} size="sm" />
                          </div>
                        </div>

                        {review?.user?._id === existUserId && (
                          <ReviewActions
                            isAuthor={true}
                            onDelete={() => handleDeleteReview(review._id)}
                          />
                        )}
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      {review?.image[0]?.url && (
                        <img
                          src={review?.image[0]?.url}
                          alt="Review Image"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      )}
                    </motion.div>
                  ))
                )}
              </div>

              <button
                onClick={openReviewModal}
                className="mt-8 px-6 py-2 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-700"
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
      </div>
    </Suspense>
  );
};

export default ProductPage;
