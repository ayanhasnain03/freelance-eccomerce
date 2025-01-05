import { Link } from "react-router-dom";
import Star from "../Star";
import { memo } from "react";
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

    handleFav,
    removeFromFav,
  }) => {
   

    const discountedPrice = discount > 0 ? (price / (1 - discount / 100)).toFixed(2) : null;

    return (
      <article className="max-w-sm w-full bg-white overflow-hidden relative rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" onClick={() => window.scrollTo(0, 0)}>
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
          <div className="w-full h-[250px] sm:h-[300px] overflow-hidden rounded-lg">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>

        <div className="p-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{name}</h2>

          <p className="text-sm sm:text-base text-gray-600 font-medium mb-3">
            {description?.length > 60
              ? `${description.slice(0, 60)}...`
              : description}
          </p>

          <div className="flex items-center space-x-2 text-xs sm:text-sm text-yellow-500">
            <Star rating={rating} />
            <span>{rating.toFixed(1)} / 5</span>
          </div>

          <div className="flex items-center mt-3 justify-between">
            <p className="text-xl font-semibold text-gray-900">
              ₹{price.toFixed(0)}
            </p>
           
              <div className="flex items-center space-x-2">
                <p className="text-sm line-through text-gray-500">
                  ₹{discountedPrice}
                </p>
                <span className="bg-red-500 text-white text-xs sm:text-sm font-semibold h-[24px] sm:h-[28px] w-[60px] sm:w-[80px] text-center rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:bg-red-600">
                  {discount}% OFF
                </span>
              </div>
         
          </div>
        </div>

      </article>
    );
  }
);

export default ProductCard;
