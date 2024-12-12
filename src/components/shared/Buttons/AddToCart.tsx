import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, calculatePrice } from "../../../redux/reducers/cartReducer";

const AddToCart = ({productName,price,sizes, image,_id,stock,quantity}: any) => {

  const dispatch = useDispatch();
    const addToCartHandler = () => {
        console.log(productName,price,sizes, image)
        //@ts-ignore
        dispatch(addToCart({productName,price,sizes, image,_id,stock,quantity}));
        dispatch(calculatePrice());
    }
  return (
    <button
      onClick={addToCartHandler}
      className="mt-4 flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
      <div className="flex items-center">
        <span className="ml-1 text-white">Add to cart</span>
      </div>
      <div className="ml-2 flex items-center gap-1 text-sm md:flex ">
        {/* Cart Icon SVG */}
       <FaShoppingCart className="w-4 h-4 "/>
      </div>
    </button>
  );
};

export default AddToCart;
