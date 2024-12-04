import { Link } from "react-router-dom";
import { NavConstants } from "../../../constanst/Navlinks";
import { useLocation } from "react-router-dom";

const NavItem = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-full md:flex items-center justify-center space-x-4">
      {NavConstants.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`text-base font-noto text-gray-800 hover:text-blue-500 transition-all duration-300 ${pathname === item.path ? "text-blue-500" : ""}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavItem;
