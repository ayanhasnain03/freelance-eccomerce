import { Input } from "../Inputs/Input";
import NavItem from "./NavItem";
import { FiSearch } from "react-icons/fi";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobile } from "../../../redux/reducers/misc";
import { memo, useCallback } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state: any) => state.misc);

  const handleToggle = useCallback(() => {
    dispatch(setIsMobile(!isMobile));
  }, [dispatch, isMobile]);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md relative">
      {/* Hamburger Menu Button */}
      <button
        className="md:hidden"
        aria-label={isMobile ? "Close menu" : "Open menu"} // Dynamic label based on the state
        type="button"
        aria-expanded={isMobile ? "true" : "false"} // Indicates whether the menu is open or not
        aria-controls="mobile-menu" // Ties the button to the mobile menu element
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
      <Link to="/" aria-label="Go to homepage">
        <div className="flex-shrink-0">
          <img
            src="/SHOP.CO.svg"
            alt="SHOP.CO Logo"
            className="w-32 md:w-40 h-[40px] cursor-pointer"
          />
        </div>
      </Link>

      {/* Desktop Navigation Items */}
      <div className="hidden md:flex space-x-6">
        <NavItem />
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xs mx-4">
        <Input
          type="text"
          Icon={FiSearch}
          placeholder="Search..."
          className="w-full"
          aria-label="Search products"
        />
      </div>

      {/* User & Shopping Bag Icons */}
      <div className="flex items-center space-x-4">
        <img
          src="/user.png"
          alt="User"
          className="w-6 h-6 cursor-pointer"
          aria-label="User profile"
        />
        <img
          src="/shopping-bag.png"
          alt="Shopping Bag"
          className="w-6 h-6 cursor-pointer"
          aria-label="View shopping bag"
        />
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          id="mobile-menu"
          className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col gap-6 overflow-hidden z-10"
          role="region" // Denotes a region of the page
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
    </div>
  );
};

export default memo(Nav);
