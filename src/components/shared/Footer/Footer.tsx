import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-12 relative">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="lg:flex lg:items-start lg:gap-16">
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <div>
              <img src="SHOP.CO.svg" alt="Logo" className="w-32" />
              <p className="mt-4 text-gray-500 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quae, quos.
              </p>
            </div>
          </div>

          <div className="lg:w-1/4">
            <p className="font-medium text-gray-900 text-lg">Quick Links</p>
            <ul className="mt-6 space-y-4 text-sm text-gray-700">
              <li>
                <Link to="/" className="transition hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition hover:text-gray-800">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-gray-800">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition hover:text-gray-800">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/4">
            <p className="font-medium text-gray-900 text-lg">Legal</p>
            <ul className="mt-6 space-y-4 text-sm text-gray-700">
              <li>
                <Link to="/terms" className="transition hover:text-gray-800">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="transition hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/4">
            <p className="font-medium text-gray-900 text-lg">Payment Methods</p>
            <div className="mt-6 flex gap-4">
              <img src="razorpay-icon.svg" alt="razorpay" className="w-20" />
            </div>

            <p className="font-medium text-gray-900 mt-8 text-lg">Follow Us</p>
            <ul className="flex gap-6 mt-6">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-gray-700 transition hover:text-gray-800"
                >
                  <FaFacebookF className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-gray-700 transition hover:text-gray-800"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:example@example.com"
                  aria-label="Email"
                  className="text-gray-700 transition hover:text-gray-800"
                >
                  <FaEnvelope className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/your-phone-number"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="text-gray-700 transition hover:text-gray-800"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2022 ShopCo. All rights reserved.
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        <img
          src="razorpay-icon.svg"
          alt="Powered by Razorpay"
          className="w-12"
        />
        <span className="text-sm text-gray-500">Powered by</span>
      </div>
    </footer>
  );
};

export default Footer;
