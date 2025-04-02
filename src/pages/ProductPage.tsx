import { lazy, memo, Suspense, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteReviewMutation,
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
  useGetReviewsQuery,
} from "../redux/api/productApi";

import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEllipsisV,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaShare,
  FaShieldAlt,
  FaTruck,
  FaTwitter,
  FaUndo,
  FaWhatsapp,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import ScrollToTopOnReload from "../components/ResetPage";
import Loader from "../components/shared/Loader/Loader";
import Skeleton from "../components/shared/Skeleton";

const Star = lazy(() => import("../components/cards/Star"));
const AddToCart = lazy(() => import("../components/shared/Buttons/AddToCart"));
const ReviewModal = lazy(() => import("../components/shared/ReviewModal"));
const ProductLayout = lazy(
  () => import("../components/cards/product/ProductLayout")
);
const AnimText = lazy(() => import("../components/shared/AnimText"));

const ReviewActions = memo(
  ({ onDelete, isAuthor }: { onDelete: () => void; isAuthor: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
      <div className="relative">
        {isAuthor && (
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-300"
            aria-label="More actions"
          >
            <FaEllipsisV />
          </button>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-32 bg-white shadow-xl rounded-lg border border-gray-100 z-10 overflow-hidden"
              role="menu"
            >
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

const ShareOptions = memo(
  ({
    isOpen,
    onClose,
    productUrl,
  }: {
    isOpen: boolean;
    onClose: () => void;
    productUrl: string;
  }) => {
    const shareOptions = [
      {
        name: "WhatsApp",
        icon: <FaWhatsapp className="text-green-500" size={24} />,
        url: `https://wa.me/?text=${encodeURIComponent(productUrl)}`,
      },
      {
        name: "Instagram",
        icon: <FaInstagram className="text-pink-500" size={24} />,
        url: `https://www.instagram.com/sharer.php?u=${encodeURIComponent(
          productUrl
        )}`,
      },
      {
        name: "Email",
        icon: <FaEnvelope className="text-red-500" size={24} />,
        url: `mailto:?body=${encodeURIComponent(productUrl)}`,
      },
      {
        name: "Facebook",
        icon: <FaFacebook className="text-blue-600" size={24} />,
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          productUrl
        )}`,
      },
      {
        name: "Twitter",
        icon: <FaTwitter className="text-blue-400" size={24} />,
        url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          productUrl
        )}`,
      },
    ];

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 z-10 overflow-hidden"
          >
            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(option.url, "_blank", "width=600,height=400");
                  onClose();
                }}
              >
                {option.icon}
                <span className="text-gray-700">{option.name}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

const ImageGallery = memo(
  ({
    images,
    selectedIndex,
    onSelect,
  }: {
    images: any[];
    selectedIndex: number;
    onSelect: (index: number) => void;
  }) => {
    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]?.url}
            alt={`Product view ${selectedIndex + 1}`}
            className="w-full h-[600px] object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() =>
              onSelect((selectedIndex - 1 + images.length) % images.length)
            }
          >
            <FaArrowLeft className="text-gray-800" />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onSelect((selectedIndex + 1) % images.length)}
          >
            <FaArrowRight className="text-gray-800" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {images?.map((image: any, index: number) => (
            <motion.button
              key={image.url}
              onClick={() => onSelect(index)}
              className={`relative rounded-lg overflow-hidden ${
                index === selectedIndex
                  ? "ring-4 ring-teal-500 shadow-lg"
                  : "hover:ring-4 hover:ring-teal-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-24 object-cover"
              />
              {index === selectedIndex && (
                <div className="absolute inset-0 bg-teal-500/20" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }
);

const ProductPage = () => {
  const existUserId = useSelector((state: any) => state.user.user._id);
  const { id } = useParams<{ id: string }>();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = useCallback(() => setIsReviewModalOpen(false), []);

  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const { data: productData, isLoading, isError } = useGetProductByIdQuery(id);
  const { data: reviews, isLoading: reviewLoading } = useGetReviewsQuery(id);
  const categoryId = productData?.product?.category?._id || null;
  const { data: relatedProductsData, isLoading: relatedLoading } =
    useGetRelatedProductsQuery(categoryId, {
      skip: !categoryId,
    });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (productData?.product) {
      setSelectedSize(productData.product?.sizes?.[0] || null);
    }
  }, [productData]);

  if (isError) {
    toast.error("Error loading product details!");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-600 font-semibold">
          Error loading product details
        </div>
      </div>
    );
  }

  const product = productData?.product;
  const relatedProducts =
    relatedProductsData?.products?.filter(
      (item: any) => item._id !== product?._id
    ) || [];
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

  const productUrl = `${window.location.origin}/product/${id}`;

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <ScrollToTopOnReload />
        {isLoading || relatedLoading ? (
          <Loader />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ImageGallery
                  images={product?.images || []}
                  selectedIndex={selectedImageIndex}
                  onSelect={setSelectedImageIndex}
                />
              </motion.div>

              <motion.div
                className="flex flex-col space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                      {product?.brand || "Premium Brand"}
                    </span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {product?.category?.name}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {product?.name}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {product?.description}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl font-bold text-teal-600">
                        ₹{discountedPrice}
                      </span>
                      <div className="flex flex-col">
                        <del className="text-xl text-gray-400">
                          ₹{product?.price}
                        </del>
                        <span className="text-green-600 text-lg font-medium">
                          Save ₹{product?.price - discountedPrice}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 mt-2">
                      Inclusive of all taxes
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center">
                    <Star rating={product?.rating} size="lg" />
                    <span className="ml-3 text-lg text-gray-700">
                      ({product?.numReviews} reviews)
                    </span>
                  </div>
                  <div className="h-6 w-px bg-gray-300" />
                  <span className="text-lg font-medium">
                    {product?.stock > 0 ? (
                      <span className="text-green-600">
                        {product.stock} units in Stock
                      </span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-2xl shadow-inner">
                  <div className="flex flex-col items-center text-center p-4 hover:bg-white rounded-xl transition-colors duration-300">
                    <FaTruck className="text-3xl text-teal-600 mb-2" />
                    <span className="text-sm font-medium">Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 hover:bg-white rounded-xl transition-colors duration-300">
                    <FaShieldAlt className="text-3xl text-teal-600 mb-2" />
                    <span className="text-sm font-medium">Premium Quality</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 hover:bg-white rounded-xl transition-colors duration-300">
                    <FaUndo className="text-3xl text-teal-600 mb-2" />
                    <span className="text-sm font-medium">7 Days Return</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {product?.sizes?.map((size: string) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-teal-600 text-white shadow-lg ring-2 ring-teal-300"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
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

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  ></motion.button>

                  <div className="relative">
                    <motion.button
                      className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                    >
                      <FaShare size={24} />
                    </motion.button>
                    <ShareOptions
                      isOpen={isShareMenuOpen}
                      onClose={() => setIsShareMenuOpen(false)}
                      productUrl={productUrl}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-32 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimText
                text="Similar Products You May Like"
                fontSize="4xl"
                fontWeight="bold"
              />
              <div className="mt-12">
                {relatedLoading ? (
                  <Skeleton quantity={4} />
                ) : (
                  <ProductLayout data={{ products: relatedProducts }} />
                )}
              </div>
            </motion.div>

            <motion.div
              className="mt-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center">
                <AnimText
                  text="Customer Reviews"
                  fontSize="4xl"
                  fontWeight="bold"
                />
                <motion.button
                  onClick={openReviewModal}
                  className="px-8 py-4 bg-teal-600 text-white rounded-xl font-medium text-lg shadow-xl hover:bg-teal-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Processing..." : "Write a Review"}
                </motion.button>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {reviewLoading ? (
                  <Skeleton quantity={3} />
                ) : reviews?.reviews?.length === 0 ? (
                  <div className="col-span-3 text-center text-gray-500 py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <div className="text-xl">
                      No reviews yet. Be the first to review this product!
                    </div>
                  </div>
                ) : (
                  reviews?.reviews?.map((review: any) => (
                    <motion.div
                      key={review._id}
                      className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-teal-100">
                            <img
                              src={review?.user?.avatar[0]?.url}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900">
                              {review.user.name}
                            </h4>
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

                      <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        {review.comment}
                      </p>

                      {review?.image[0]?.url && (
                        <div className="rounded-xl overflow-hidden">
                          <img
                            src={review?.image[0]?.url}
                            alt="Review"
                            className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            <ReviewModal
              productId={id as string}
              isOpen={isReviewModalOpen}
              closeModal={closeReviewModal}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default ProductPage;
