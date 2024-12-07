import { lazy } from "react";
import SideBar from "../components/collections/SideBar";
import ProductLayout from "../components/cards/product/ProductLayout";

const CollectionLayout = lazy(
  () => import("../components/layouts/CollectionLayout")
);
const Collection = () => {
  return (
    <div className="">
      <CollectionLayout>
        <SideBar />

        <div className="md:flex-1 mt-10 mx-auto">
          <ProductLayout />
        </div>
      </CollectionLayout>
    </div>
  );
};

export default Collection;
