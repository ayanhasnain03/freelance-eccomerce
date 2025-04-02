import NavItem from "./NavItem";
import { FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobile } from "../../../redux/reducers/misc";
import { memo, useCallback, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Logo from "../../../assets/fashalt.svg";

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

  const closeSearchResults = () => {
    setShowResults(false);
    setKeyword("");
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 bg-white"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="md:hidden -ml-2 p-2"
              aria-label={isMobile ? "Close menu" : "Open menu"}
              onClick={handleToggle}
            >
              <Hamburger
                toggled={isMobile}
                toggle={handleToggle}
                size={20}
                color="black"
                duration={0.3}
              />
            </button>

            <Link to="/" className="flex-shrink-0">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={Logo}
                alt="Logo"
                className="h-8 w-auto"
              />
            </Link>

            <div className="hidden md:flex ml-10 space-x-8">
              <NavItem />
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-6 hidden md:block">
            <div className="relative">
              <motion.input
                initial={false}
                animate={{ 
                  width: showResults ? "100%" : "90%",
                  boxShadow: showResults ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"
                }}
                type="text"
                value={keyword}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-rose-500 transition-all"
                placeholder="Search for products..."
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              
              <AnimatePresence>
                {showResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 right-0 top-12 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-2">
                      <button
                        onClick={closeSearchResults}
                        className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <FiX className="w-5 h-5 text-gray-500" />
                      </button>
                      {searchResults.map((product) => (
                        <motion.div
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          key={product._id}
                        >
                          <Link
                            to={`/collections/item/${product._id}`}
                            onClick={closeSearchResults}
                            className="flex items-center p-3 rounded-lg"
                          >
                            <img
                              src={product.images[0]?.url}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <span className="ml-4 text-sm font-medium text-gray-900">
                              {product.name}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <motion.div whileHover={{ scale: 1.1 }}>
              {user && user._id ? (
                <Link to="/profile">
                  <img src="/user.png" alt="Profile" className="w-6 h-6" />
                </Link>
              ) : (
                <Link to="/auth">
                  <img src="/user.png" alt="Login" className="w-6 h-6" />
                </Link>
              )}
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className="relative">
              <Link to="/cart">
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                  {cartItems.length}
                </span>
                <FiShoppingBag className="w-6 h-6 text-gray-700" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to="/profile/wishlist">
                <FaRegHeart className="w-6 h-6 text-gray-700" />
              </Link>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isMobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavItem />
                <div className="mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={keyword}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-rose-500"
                      placeholder="Search..."
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    
                    {showResults && searchResults.length > 0 && (
                      <div className="absolute left-0 right-0 top-12 bg-white border shadow-lg rounded-lg max-h-80 overflow-auto z-50">
                        {searchResults.map((product) => (
                          <Link
                            to={`/collections/item/${product._id}`}
                            onClick={closeSearchResults}
                            key={product._id}
                            className="flex items-center p-3 hover:bg-gray-50"
                          >
                            <img
                              src={product.images[0]?.url}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <span className="ml-4 text-sm font-medium text-gray-900">
                              {product.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default memo(Nav);
