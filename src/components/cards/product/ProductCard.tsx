import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Fav from "../Fav";
import Star from "../Star";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  image: { url: string; public_id: string }[];
  productId: string;
  isFav: boolean;
  handleFav: (id: string) => void;
  removeFromFav: (id: string) => void;
  brand?: string;
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
    brand,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const originalPrice =
      discount > 0 ? (price / (1 - discount / 100)).toFixed(2) : null;

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
      if (image.length > 1) setCurrentImageIndex(1);
    }, [image.length]);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      setCurrentImageIndex(0);
    }, []);

    const handleImageLoad = useCallback(() => setIsLoading(false), []);

    const imageUrl = image[currentImageIndex]?.url || image[0]?.url;

    return (
      <motion.article
        className="w-[300px] md:w-[200px] lg:w-[260px]  xl:max-w-[280px] overflow-hidden h-auto bg-white relative  border border-gray-200 rounded-lg shadow-md transition-all hover:shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Favorite Button */}
        <motion.div className="absolute top-4 right-4 z-20">
          <button
            className="bg-white p-2 rounded-full shadow-md hover:ring-2 hover:ring-red-300"
            aria-label={`Toggle favorite for ${name}`}
          >
            <Fav
              isFav={isFav}
              addToFav={handleFav}
              removeFromFav={removeFromFav}
              productId={productId}
            />
          </button>
        </motion.div>

        <Link to={`/collections/item/${productId}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <motion.img
              src={imageUrl}
              alt={name}
              onLoad={handleImageLoad}
              className="w-full h-full object-cover transition-transform duration-500 ease-out transform"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            />
            {/* Discount Badge */}
            <AnimatePresence>
              {discount > 0 && (
                <motion.div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  -{discount}% OFF
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-2">
            {brand && (
              <span className="text-xs text-gray-500 uppercase font-medium">
                {brand}
              </span>
            )}
            <h2 className="text-sm md:text-base font-semibold text-gray-800 truncate">
              {name}
            </h2>
            <div className="flex items-center justify-between mt-1">
              <Star rating={rating} />
              <span className="text-xs md:text-sm text-gray-600">
                ({rating})
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm md:text-base font-bold text-red-600">
                ₹{price}
              </div>
              {discount > 0 && (
                <div className="text-xs md:text-sm text-gray-400 line-through">
                  ₹{originalPrice}
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.article>
    );
  },
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name &&
    prevProps.price === nextProps.price &&
    prevProps.discount === nextProps.discount &&
    prevProps.rating === nextProps.rating &&
    prevProps.isFav === nextProps.isFav &&
    prevProps.image === nextProps.image
);

export default ProductCard;
