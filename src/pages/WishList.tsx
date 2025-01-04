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
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-xl">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 overflow-hidden rounded-lg mb-4">
                {/* Image with fallback */}
                <img
                  src={item.images[0]?.url || "/default-image.png"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">{item.price} USD</span>
                {item.discount > 0 && (
                  <span className="text-red-500 font-semibold">{item.discount}% OFF</span>
                )}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Rating: {item.rating} stars</span>
                <span>Stock: {item.stock} available</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
               
                <button
                  className="py-2 px-6 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
