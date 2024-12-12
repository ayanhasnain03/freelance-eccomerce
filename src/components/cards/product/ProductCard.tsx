import { Link } from "react-router-dom";
import Star from "../Star";
import { memo, useCallback } from "react";
import Fav from "../Fav";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
  productId: string;
  isFav: boolean;
  handleFav: (id: string) => void;
  removeFromFav: (id: string) => void;
  isCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    name,
    description,
    price,
    discount,
    rating,
    image,
    productId,
    isFav,
    isCart,
    handleFav,
    removeFromFav,
  }) => {
    const handleAddToCart = useCallback(() => {
      console.log(`${name} added to the cart!`);
    }, [name]);

    return (
      <article className="w-[250px] h-[350px] overflow-hidden bg-white rounded-lg shadow-lg relative transition-transform transform hover:scale-105">
        {/* Favorite Button */}
        <button
          className="absolute top-2 right-2 z-20"
          aria-label={`Toggle favorite for ${name}`}
        >
          <Fav
            isFav={isFav}
            addToFav={handleFav}
            removeFromFav={removeFromFav}
            productId={productId}
          />
        </button>

        {/* Product Link */}
        <Link
          to={`/collections/item/${productId}`}
          className="block relative group"
          aria-label={`View details of ${name}`}
        >
          {/* Discount Badge */}
          <div className="absolute z-20 top-2 left-2 bg-rose-700 text-white text-xs px-2 py-1 rounded-r-xl">
            -{discount}%
          </div>

          {/* Image */}
          <div className="w-full h-[200px] overflow-hidden p-4">
            <img
              src={image}
              alt={name}
              className="group-hover:scale-105 transition-all duration-300 ease-in-out w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-4">
          <h2 className="text-sm font-satoshi text-gray-700 font-semibold mb-2 truncate">{name}</h2>

          {/* Description */}
          <p className="text-xs text-gray-600 font-medium mb-2">
            {description && description.length > 40
              ? description.slice(0, 40) + "..."
              : description}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2 text-xs text-gray-700">
            <Star rating={rating} />
            <span>{rating.toFixed(1)} / 5</span>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center mt-2 space-x-2">
            <p className="text-lg font-semibold text-green-700">
              ${price.toFixed(2)}
            </p>
            <p className="ml-4 text-sm line-through text-rose-500">
              ${(price / (1 - discount / 100)).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        {isCart && (
          <button
            className="absolute bottom-2 left-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            Add to Cart
          </button>
        )}
      </article>
    );
  }
);

export default ProductCard;
