import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, calculatePrice } from "../../../redux/reducers/cartReducer";
import { useCallback } from "react";



const AddToCart = ({ productName, price, sizes, image, _id, stock, quantity }:any) => {
  const dispatch = useDispatch();

  const addToCartHandler = useCallback(() => {
    dispatch(
      addToCart({
        //@ts-ignore
        productName,
        price,
        sizes,
        image,
        _id,
        stock,
        quantity,
      })
    );
    dispatch(calculatePrice());
  }, [dispatch, productName, price, sizes, image, _id, stock, quantity]);

  return (
    <button
      onClick={addToCartHandler}
      className="mt-4 flex items-center justify-center w-full gap-2 text-sm font-medium text-white bg-black rounded-md h-9 px-4 py-2 shadow hover:bg-black/90 hover:ring-2 hover:ring-black hover:ring-offset-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40" />
      <span>Add to cart</span>
      <FaShoppingCart className="w-4 h-4" />
    </button>
  );
};

export default AddToCart;
