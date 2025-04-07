import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useState } from "react";
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

    // Preload secondary image
    useEffect(() => {
      if (image.length > 1) {
        const img = new Image();
        img.src = image[1].url;
      }
    }, [image]);

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
        className="w-full max-w-[300px] overflow-hidden bg-white relative rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -5 }}
      >
        {/* Favorite Button */}
        <motion.div className="absolute top-4 right-4 z-20">
          <motion.button
            className="bg-white/90 p-2 rounded-full shadow-md hover:shadow-lg backdrop-blur-sm transition-all"
            aria-label={`Toggle favorite for ${name}`}
            whileTap={{ scale: 0.9 }}
          >
            <Fav
              isFav={isFav}
              addToFav={handleFav}
              removeFromFav={removeFromFav}
              productId={productId}
            />
          </motion.button>
        </motion.div>

        <a href={`/collections/item/${productId}`} className="block group">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            )}
            <motion.img
              src={imageUrl}
              alt={`${name} product image`}
              onLoad={handleImageLoad}
              className="w-full h-full object-cover origin-top"
              transition={{ type: "tween", duration: 0.5 }}
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            />

            {/* Discount Badge */}
            <AnimatePresence>
              {discount > 0 && (
                <motion.div
                  className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  -{discount}% OFF
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 space-y-2">
            {brand && (
              <span className="block text-xs text-gray-500 uppercase font-medium tracking-wide">
                {brand}
              </span>
            )}
            <h2 className="text-gray-900 font-semibold text-lg leading-tight line-clamp-2 h-14">
              {name}
            </h2>

            <div className="flex items-center gap-1">
              <Star rating={rating} />
              <span className="text-sm text-gray-600">
                ({rating.toFixed(1)})
              </span>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 h-10">
              {description}
            </p>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ₹{price}
                </span>
              </div>

              {discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>
          </div>
        </a>
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
