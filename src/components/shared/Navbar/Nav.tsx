import NavItem from "./NavItem";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobile } from "../../../redux/reducers/misc";
import { memo, useCallback } from "react";
import { Link } from "react-router-dom";

const Nav = ({ user }: any) => {
  const dispatch = useDispatch();
  const isMobile = useSelector(
    (state: { misc: { isMobile: boolean } }) => state.misc.isMobile
  );

  const handleToggle = useCallback(() => {
    dispatch(setIsMobile(!isMobile));
  }, [dispatch, isMobile]);

  const { cartItems } = useSelector((state: any) => state.cart);

  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-4 bg-white shadow-md relative">
      {/* Hamburger Menu Button (Mobile Only) */}
      <button
        className="md:hidden"
        aria-label={isMobile ? "Close menu" : "Open menu"}
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

      {/* Logo */}
      <Link to="/" aria-label="Go to homepage" className="flex-shrink-0 ml-4 md:ml-0">
        <img
          src="fashALt.svg"
          alt="SHOP.CO Logo"
          className="h-8 w-8 md:h-10 md:w-24 cursor-pointer"
        />
      </Link>

      {/* Navigation Items (Desktop Only) */}
      <div className="hidden md:flex flex-1 justify-center space-x-8">
        <NavItem />
      </div>

      {/* Search Bar (Desktop Only) */}
      <div className="hidden md:flex flex-1 max-w-xs mx-6">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="Search..."
            aria-label="Search products"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* User Profile, Cart, and Wishlist Icons */}
      <div className="flex items-center space-x-4 mt-0 md:mt-0">
        {/* User Profile */}
        {user && user?._id ? (
          <Link to="/profile" aria-label="Go to profile">
            <img
              src="/user.png"
              alt="User"
              className="w-6 h-6 cursor-pointer"
              aria-label="User profile"
            />
          </Link>
        ) : (
          <Link to="/auth" aria-label="Login">
            <img
              src="/user.png"
              alt="User"
              className="w-6 h-6 cursor-pointer"
              aria-label="User profile"
            />
          </Link>
        )}

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart" aria-label="Go to cart">
            <label className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-xs font-semibold rounded-full text-white flex items-center justify-center">
              {cartItems.length}
            </label>
            <FiShoppingBag className="w-6 h-6 cursor-pointer text-[#3f3f3f]" aria-label="Cart" />
          </Link>
        </div>

        {/* Wishlist Icon */}
        <FaRegHeart className="w-6 h-6 cursor-pointer text-[#3f3f3f]" aria-label="Wishlist" />
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          id="mobile-menu"
          className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col gap-6 z-10"
          role="region"
          aria-label="Mobile menu"
        >
          <NavItem />
          <div>
            <div className="relative w-full">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="Search..."
                aria-label="Search products in mobile menu"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default memo(Nav);
