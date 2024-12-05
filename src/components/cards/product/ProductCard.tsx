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
  isCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ name, price, discount, rating, image, productId, isFav, isCart }) => {
    const handleAddToCart = useCallback(() => {
      console.log(`${name} added to the cart!`);
    }, [name]);

    return (
      <article className="h-[350px] w-[250px] overflow-hidden bg-white">
        <Link to={`/product/${productId}`} className="block">
          <div className="relative">
            <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 text-sm rounded-r-xl z-10">
              -{discount}%
            </div>

            <div className="w-full h-[200px]">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute top-2 right-2">
                <Fav isFav={isFav} />
              </div>
            </div>
          </div>

          <div className="p-2">
            <h2 className="text-sm font-semibold  text-black truncate">
              {name}
            </h2>

 <div className="flex items-center space-x-2 mt-1">
  <Star rating={rating} />
  <p className="text-[12px] text-gray-600 font-medium">{rating.toFixed(1)} / 5</p>
</div>


            <div className="flex items-center mt-1">
              <p className="text-base font-medium text-green-600">
                ${price.toFixed(2)}
              </p>

              <p className="ml-4 bg-rose-200 text-sm line-through text-rose-500">
                ${(price / (1 - discount / 100)).toFixed(2)}
              </p>
            </div>


          </div>
        </Link>

        {isCart && (
          <button
            className="absolute bottom-2 left-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </article>
    );
  }
);

export default ProductCard;
