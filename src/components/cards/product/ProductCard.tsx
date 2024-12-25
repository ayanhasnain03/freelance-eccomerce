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

    const discountedPrice = discount > 0 ? (price / (1 - discount / 100)).toFixed(2) : null;

    return (
      <article className="max-w-sm w-full bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl overflow-hidden relative">
        <button
          className="absolute top-3 right-3 z-20"
          aria-label={`Toggle favorite for ${name}`}
        >
          <Fav
            isFav={isFav}
            addToFav={handleFav}
            removeFromFav={removeFromFav}
            productId={productId}
          />
        </button>

        <Link
          to={`/collections/item/${productId}`}
          className="block relative group"
          aria-label={`View details of ${name}`}
        >
          <div className="w-full h-[250px] overflow-hidden rounded-lg">
            <img
              src={image}
              alt={name}
              className="w-full h-[300px] object-cover transform transition-all duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </Link>

        <div className="p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>

          <p className="text-sm text-gray-600 font-medium mb-3">
            {description?.length > 60
              ? `${description.slice(0, 60)}...`
              : description}
          </p>

          <div className="flex items-center space-x-2 text-xs text-yellow-500">
            <Star rating={rating} />
            <span>{rating.toFixed(1)} / 5</span>
          </div>

          <div className="flex items-center mt-3 space-x-3">
            <p className="text-xl font-semibold text-gray-900">
              ${price.toFixed(2)}
            </p>
            {discountedPrice && (
              <div className="flex items-center space-x-2">
                <p className="text-sm line-through text-gray-500">
                  ${discountedPrice}
                </p>
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  {discount}% OFF
                </span>
              </div>
            )}
          </div>
        </div>

        {isCart && (
          <button
            className="absolute bottom-5 left-5 bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transform transition-all duration-300"
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