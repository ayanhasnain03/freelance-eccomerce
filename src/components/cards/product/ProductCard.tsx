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
    const discountedPrice =
      discount > 0 ? (price / (1 - discount / 100)).toFixed(2) : null;

    return (
      <article className="w-[280px] h-[400px] md:w-[20vw] md:h-[320px] bg-white relative shadow-lg rounded-lg overflow-hidden ">
     
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
          onClick={() => window.scrollTo(0, 0)}
          to={`/collections/item/${productId}`}
          className="block relative group"
          aria-label={`View details of ${name}`}
        >
          <div className="flex items-center justify-center ">
            <img
              src={image}
              alt={name}
              className="w-full h-[280px] md:w-[180px] md:h-[180px] object-cover rounded-md"
              loading="lazy"
            />
          </div>

          <div className="mt-4 px-4 pb-4 ">
            <h2 className="text-lg sm:text-[14px] font-semibold text-gray-800 truncate">
              {name}
            </h2>
            <p className="text-[12px] text-gray-600 font-medium mb-1 text-start">
              {description?.length > 60
                ? `${description.slice(0, 78)}...`
                : description}
            </p>

           
            <div className="flex items-center justify-between text-[12px] text-yellow-500">
              <Star rating={rating} />
              {discount > 0 && (
                <div className="text-green-500 font-semibold">
                  Save {discount}%
                </div>
              )}
            </div>

  
            <div className="flex items-center justify-between mt-2">
              <p className="text-[16px] font-semibold text-gray-900">
                ₹{price.toFixed(0)}
              </p>
              {discount > 0 && (
                <p className="text-[12px] font-semibold text-gray-600 line-through">
                  ₹{discountedPrice}
                </p>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }
);

export default ProductCard;
