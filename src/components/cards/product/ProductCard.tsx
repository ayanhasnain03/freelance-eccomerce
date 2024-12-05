import { Link } from "react-router-dom";
import Star from "../Star";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { memo, useCallback } from "react";

interface ProductCardProps {
  name: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
  productId: string;
  isFav: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ name, price, discount, rating, image, productId, isFav }) => {
    // Use useCallback to memoize the add to cart handler
    const handleAddToCart = useCallback(() => {
      console.log(`${name} added to the cart!`);
    }, [name]); // Only recreate the function if `name` changes

    return (
      <article className="h-[350px] w-[250px] border relative rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
        <Link to={`/product/${productId}`} className="block relative">
          <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 text-sm rounded-r-xl z-10 shadow-md">
            -{discount}%
          </div>

          <div className="w-full h-[200px] relative">
            <img
              src={image}
              alt={name}  // Descriptive alt text for accessibility
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy" // Lazy load image for better performance
            />

            <div className="absolute top-2 right-2">
              {isFav ? (
                <FaHeart style={{ color: "red", fontSize: "1.25rem" }} />
              ) : (
                <FaRegHeart style={{ color: "red", fontSize: "1.25rem" }} />
              )}
            </div>
          </div>

          <div className="p-2">
            <h2 className="text-lg font-semibold text-gray-700 truncate hover:text-slate-800 transition-colors duration-200">
              {name}
            </h2>

            <div className="flex items-center mt-1">
              <p className="text-base font-medium text-green-600">
                ${price.toFixed(2)}
              </p>
              <p className="ml-2 text-sm line-through text-gray-500">
                ${(price / (1 - discount / 100)).toFixed(2)}
              </p>
            </div>

            <div className="mt-1">
              <Star rating={rating} />
            </div>
          </div>
        </Link>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors duration-300"
        >
          Add to cart
        </button>
      </article>
    );
  }
);

export default ProductCard;
