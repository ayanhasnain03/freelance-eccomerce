import NavItem from "./NavItem";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobile } from "../../../redux/reducers/misc";
import { memo, useCallback, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../../assets/fashalt.svg"
interface User {
  _id?: string;
}

interface Product {
  _id: string;
  name: string;
  images: { url: string }[];
}

interface State {
  misc: {
    isMobile: boolean;
  };
  cart: {
    cartItems: any[];
  };
}

interface NavProps {
  user: User | null;
}

const Nav: React.FC<NavProps> = ({ user }) => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state: State) => state.misc.isMobile);
  const cartItems = useSelector((state: State) => state.cart.cartItems);

  const [keyword, setKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    dispatch(setIsMobile(!isMobile));
  }, [dispatch, isMobile]);

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.trim()) {
      try {
        const { data } = await axios.get<{ products: Product[] }>(
          `${import.meta.env.VITE_SERVER}/api/v1/product/search?keyword=${value}`
        );
        setSearchResults(data.products);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      }
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  return (
   <header>

<nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-4 bg-white shadow-md relative">
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

      <Link to="/" aria-label="Go to homepage" className="flex-shrink-0 ml-4 md:ml-0">
        <img
          src={Logo}
          alt="Logo"
          className="h-8 w-16 md:h-10 md:w-24 cursor-pointer"
        />
      </Link>

      <div className="hidden md:flex flex-1 justify-center space-x-8">
        <NavItem />
      </div>

      <div className="hidden md:flex flex-1 max-w-xs mx-6 relative">
        <div className="relative w-full">
          <input
            type="text"
            value={keyword}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-red"
            placeholder="Search..."
            aria-label="Search products"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {showResults && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-12 bg-white border shadow-lg rounded-lg max-h-80 overflow-auto z-10">
              {searchResults.map((product) => (
                <Link
                  to={`/collections/item/${product._id}`}
                  onClick={() => setShowResults(false)}
                  key={product._id}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-100"
                >
                  <img
                    src={product.images[0]?.url || "https://via.placeholder.com/50"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-0 md:mt-0">
        {user && user._id ? (
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

        <div className="relative">
          <Link to="/cart" aria-label="Go to cart">
            <label className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-xs font-semibold rounded-full text-white flex items-center justify-center">
              {cartItems.length}
            </label>
            <FiShoppingBag className="w-6 h-6 cursor-pointer text-[#3f3f3f]" aria-label="Cart" />
          </Link>
        </div>

<Link to="/profile/wishlist" aria-label="Go to wishlist">
<FaRegHeart className="w-6 h-6 cursor-pointer text-[#3f3f3f]" aria-label="Wishlist" />

          </Link>
  
        </div>

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

   </header>
  );
};

export default memo(Nav);
