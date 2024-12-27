import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="bg-white text-black border-t border-gray-200 py-8">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            Discover the best shopping experience with our premium collection of
            products. Crafted for quality and satisfaction, our store is your
            one-stop solution.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/faq" className="hover:text-blue-500 transition">
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/returns"
                className="hover:text-blue-500 transition"
              >
                Returns & Exchanges
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className="hover:text-blue-500 transition"
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-blue-500 transition">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/support" className="hover:text-blue-500 transition">
                Help Center
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sizing-guide"
                className="hover:text-blue-500 transition"
              >
                Sizing Guide
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-4 text-gray-600">
            Sign up for exclusive offers, updates, and more!
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition focus:outline-none"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-500 transition"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram className="text-xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-red-500 transition"
          >
            <FaYoutube className="text-xl" />
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-4 md:mt-0">
          © {new Date().getFullYear()} FashAlt. All rights reserved.
        </p>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-gray-100 border border-gray-300 p-4 rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-110"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
