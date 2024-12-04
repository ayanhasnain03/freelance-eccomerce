import { Link } from "react-router-dom";
import Star from "../Star";

interface ProductCardProps {
  name: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
  productId: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  discount,
  rating,
  image,
  productId,
}) => {
  const handleAddToCart = () => {
    console.log(`${name} added to the cart!`);
  };

  return (
    <article className="h-[360px] w-[250px] border relative rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
      <Link to={`/product/${productId}`} className="block">
        <div className="absolute top-0 left-0 bg-rose-500 text-white p-1 text-sm rounded-r-xl w-[40px]">
          <label htmlFor="card">-{discount}%</label>
        </div>

        <div className="w-full h-[200px]">
          <img
            src={image}
            alt="card"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        <div className="p-2">
          <h2 className="text-lg font-semibold text-gray-700 truncate hover:text-slate-800 transition-colors duration-200">
            {name}
          </h2>

          <div className="flex items-center mt-1">
            <p className="text-base font-medium text-green-600">${price}</p>
            <p className="ml-2 text-sm line-through text-gray-500">
              ${(price * (1 - discount / 100)).toFixed(2)}
            </p>
          </div>

          <div className="mt-1">
            <Star rating={rating} />
          </div>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 text-center rounded-lg mt-4 hover:bg-blue-700 transition-colors duration-300"
      >
        Add to cart
      </button>
    </article>
  );
};

export default ProductCard;
