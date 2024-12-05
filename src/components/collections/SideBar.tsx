import Category from "./Category";
import DiscountSideBar from "./DiscountSideBar";
import SizeFilter from "./SizeFilter";

const SideBar = () => {
  return (
    <div className="flex bg-white shadow-md flex-col gap-4 p-4">
     <div className="flex flex-col gap-4   px-2">
 <div className="filter-section">
        <DiscountSideBar />
      </div>
      <div className="filter-section">
        <SizeFilter />
      </div>
      <div className="filter-category">
        <Category />
      </div>
     </div>
    </div>
  );
};

export default SideBar;
