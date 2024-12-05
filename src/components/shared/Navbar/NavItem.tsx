import { Link } from "react-router-dom";
import { NavConstants } from "../../../constanst/Navlinks";
import { useLocation } from "react-router-dom";
import { memo } from "react";

const NavItem = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-full md:flex items-center justify-center space-x-4">
      {NavConstants.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`text-base font-noto text-gray-800 hover:text-blue-500 transition-all duration-300 ${
              isActive ? "text-blue-500" : ""
            }`}
            aria-label={item.name}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default memo(NavItem);
