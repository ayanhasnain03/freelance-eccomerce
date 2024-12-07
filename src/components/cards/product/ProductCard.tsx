import { Link } from "react-router-dom";
import Star from "../Star";
import { memo, useCallback } from "react";
import Fav from "../Fav";

interface ProductCardProps {
  name: string;
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
      <article className="h-[350px] w-[250px] overflow-hidden bg-white relative shadow-lg rounded-lg">
        {/* Favorite Button */}
        <button
          className="z-20 absolute top-2 right-2 cursor-pointer"
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
          to={`/product/${productId}`}
          className="block relative group"
          aria-label={`View details of ${name}`}
        >
          {/* Discount Badge */}
          <div className="absolute top-2 left-2 bg-rose-700 text-white px-2 py-1 text-xs rounded-r-xl">
            -{discount}%
          </div>

          {/* Image */}
          <div className="w-full h-[200px] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300 ease-in-out"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-2">
          <h2 className="text-sm font-semibold text-black truncate">{name}</h2>

          {/* Rating */}
          <div className="flex items-center space-x-2 mt-1">
            <Star rating={rating} />
            <p className="text-[12px] text-gray-700 font-medium">
              {rating.toFixed(1)} / 5
            </p>
          </div>

          {/* Price and Discounted Price */}
          <div className="flex items-center mt-1 space-x-2">
            <p className="text-base font-medium text-green-700">
              ${price.toFixed(2)}
            </p>
            <p className="ml-4 bg-rose-100 text-sm line-through text-rose-700">
              ${(price / (1 - discount / 100)).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        {isCart && (
          <button
            className="absolute bottom-2 left-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
