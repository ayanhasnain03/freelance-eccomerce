import { Input } from "../Inputs/Input";
import NavItem from "./NavItem";
import { FiSearch } from "react-icons/fi";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobile } from "../../../redux/reducers/misc";
import { memo, useCallback } from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state: any) => state.misc);

const handleToggle = useCallback(() => {
dispatch(setIsMobile(!isMobile))
}, [dispatch, isMobile]);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md relative">

      <div className="md:hidden">
        <Hamburger toggled={isMobile} toggle={handleToggle} />
      </div>

      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src="/SHOP.CO.svg"
          alt="SHOP.CO Logo"
          className="w-32 md:w-40"
        />
      </div>

      {/* Desktop Navigation Items */}
      <div className="hidden md:flex space-x-6">
        <NavItem />
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xs mx-4">
        <Input type="text" Icon={FiSearch} placeholder="Search..." className="w-full" />
      </div>

      {/* User & Shopping Bag Icons */}
      <div className="flex items-center space-x-4">
        <img
          src="/user.png"
          alt="User"
          className="w-6 h-6 cursor-pointer"
          aria-label="User"
        />
        <img
          src="/shopping-bag.png"
          alt="Shopping Bag"
          className="w-6 h-6 cursor-pointer"
          aria-label="Shopping Bag"
        />
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col gap-6 overflow-hidden z-10">
          <NavItem />
          <div>
            <Input type="text" Icon={FiSearch} placeholder="Search..." className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
};


export default memo(Nav);
