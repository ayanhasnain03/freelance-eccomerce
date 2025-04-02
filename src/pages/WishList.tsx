import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import axios from "axios";
import { removeFromWishList } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Loader = lazy(() => import("../components/shared/Loader/Loader"));

interface WishListItem {
  _id: string;
  brand: string;
  category: string;
  description: string;
  discount: number;
  for: string[];
  images: { url: string }[];
  name: string;
  price: number;
  quantity: number;
  rating: number;
  reviews: string[];
  sizes: string[];
  stock: number;
  isFav: boolean;
}

const useWishList = () => {
  const [wishlist, setWishlist] = useState<WishListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishList = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/wishlist`, {
        withCredentials: true,
      });

      if (response.data?.wishlist) {
        setWishlist(response.data.wishlist);
      } else {
        setError("Wishlist data is missing or malformed.");
      }
    } catch (err) {
      setError("Failed to load wishlist. Please try again later.");
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishList();
  }, [fetchWishList]);

  return { wishlist, loading, error, fetchWishList };
};

const WishList = () => {
  const { wishlist, loading, error, fetchWishList } = useWishList();
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = async (itemId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/user/wishlist/${itemId}`,
        { withCredentials: true }
      );

      fetchWishList();
      dispatch(removeFromWishList(itemId));
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleRetry = () => {
    fetchWishList();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="text-red-500 text-5xl mb-4">
            <FaHeart />
          </div>
          <p className="text-gray-800 text-xl mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            className="px-6 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            My Wishlist
          </motion.h1>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm"
          >
            <div className="text-6xl text-gray-300 mb-4">
              <FaHeart />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding items you love to your wishlist
            </p>
            <Link
              to="/collections"
              className="inline-block px-8 py-4 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors"
            >
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveFromWishlist(item._id)}
                        className="p-2 bg-white rounded-full shadow-md text-rose-500 hover:text-rose-600"
                      >
                        <FaTrash size={18} />
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">{item.brand}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-rose-500">
                          ₹{Math.floor(item.price - (item.price * item.discount) / 100)}
                        </p>
                        {item.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ₹{item.price}
                          </p>
                        )}
                      </div>

                      <Link
                        to={`/collections/item/${item._id}`}
                        className="inline-flex items-center px-4 py-2 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors"
                      >
                        <FaShoppingCart className="mr-2" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WishList;
