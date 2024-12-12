import { Input } from "../Inputs/Input";
import NavItem from "./NavItem";
import { FiSearch } from "react-icons/fi";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobile } from "../../../redux/reducers/misc";
import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
const Nav = ({user}: any) => {
  const dispatch = useDispatch();
  const isMobile = useSelector(
    (state: { misc: { isMobile: boolean } }) => state.misc.isMobile
  );

  const handleToggle = useCallback(() => {
    dispatch(setIsMobile(!isMobile));
  }, [dispatch, isMobile]);
const {cartItems} = useSelector((state: any) => state.cart);

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md relative">
      <button
        className="md:hidden"
        aria-label={isMobile ? "Close menu" : "Open menu"}
        type="button"
        aria-expanded={isMobile ? "true" : "false"}
        aria-controls="mobile-menu"
        onClick={handleToggle}
      >
        <Hamburger
          toggled={isMobile}
          toggle={handleToggle}
          size={24}
          color="black"
          duration={0.5}
          easing="ease-in-out"
          label={isMobile ? "Close menu" : "Open menu"}
        />
      </button>

      <Link to="/" aria-label="Go to homepage">
        <div className="flex-shrink-0">
          <img
            src="/SHOP.CO.svg"
            alt="SHOP.CO Logo"
            className="w-32 md:w-40 h-[40px] cursor-pointer"
          />
        </div>
      </Link>

      <div className="hidden md:flex ">
        <NavItem />
      </div>

      <div className="hidden md:flex flex-1 max-w-xs mx-4">
        <Input
          type="text"
          Icon={FiSearch}
          placeholder="Search..."
          className="w-full"
          aria-label="Search products"
        />
      </div>

      <div className="flex items-center space-x-4">

{
  user && user?._id ? (
      <Link to="/profile" aria-label="Go to profile">
         <img
          src="/user.png"
          alt="User"
          className="w-6 h-6 cursor-pointer"
          aria-label="User profile"
        />
      </Link>
  ): (
    <Link to="/auth" aria-label="Login">
        <img
          src="/user.png"
          alt="User"
          className="w-6 h-6 cursor-pointer"
          aria-label="User profile"
        />
    </Link>
  )
}





      <div className="relative">
        <Link to="/cart" aria-label="Go to cart">
        <label className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-xs font-semibold  rounded-full text-white flex items-center justify-center">{cartItems.length}</label>
          <FiShoppingBag
          className="w-6 h-6 cursor-pointer text-[#3f3f3f] font-thin"
          aria-label="Cart"
        />
        </Link>
      </div>
        <FaRegHeart
          className="w-6 h-6 cursor-pointer text-[#3f3f3f] font-thin"
          aria-label="Wishlist"
        />
      </div>

      {isMobile && (
        <div
          id="mobile-menu"
          className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col gap-6 overflow-hidden z-10"
          role="region"
          aria-label="Mobile menu"
        >
          <NavItem />
          <div>
            <Input
              type="text"
              Icon={FiSearch}
              placeholder="Search..."
              className="w-full"
              aria-label="Search products in mobile menu"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default memo(Nav);
