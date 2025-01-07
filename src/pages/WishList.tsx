import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { removeFromWishList } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

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
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const handleRetry = () => {
    fetchWishList();
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-xl">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p>{error}</p>
        <button
          onClick={handleRetry}
          className="mt-4 py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-xl text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={item.images[0].url}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-600">₹{Math.floor(item.price - (item.price * item.discount) / 100)}</p>
              <button
                onClick={() => handleRemoveFromWishlist(item._id)}
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
