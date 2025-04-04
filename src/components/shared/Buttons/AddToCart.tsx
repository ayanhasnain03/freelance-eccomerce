import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calculatePrice } from "../../../redux/reducers/cartReducer";
import { useCallback } from "react";
import toast from "react-hot-toast";



const AddToCart = ({ productName, price, sizes, image, _id, stock, quantity,discount,realPrice }:any) => {
  const {cartItems} = useSelector((state: any) => state.cart);

  const isItemInCart = cartItems.some((item: any) => item._id === _id);

  const dispatch = useDispatch();

  const addToCartHandler = useCallback(() => {
    if(isItemInCart) {
      toast.error("Item already in cart");
      return;
    }
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
        discount,
        realPrice

      })
    );
    dispatch(calculatePrice());
    toast.success("Product added to cart");
  }, [dispatch, productName, price, sizes, image, _id, stock, quantity]);

  return (
    <button
    disabled={stock === 0}
      onClick={addToCartHandler}
      className="mt-4 flex items-center justify-center w-full  gap-2 text-sm font-medium text-white bg-black rounded-md h-9 px-4 py-2 shadow hover:bg-black/90 hover:ring-2 hover:ring-black hover:ring-offset-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
    >
      <span>Add to cart</span>
      <FaShoppingCart className="w-4 h-4" />
    </button>
  );
};

export default AddToCart;
