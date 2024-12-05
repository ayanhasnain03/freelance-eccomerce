
import { lazy } from "react";
import SideBar from "../components/collections/SideBar";

const CollectionLayout = lazy(() => import("../components/layouts/CollectionLayout"));
const Collection = () => {
  return (
  <CollectionLayout >

<SideBar />

  <h1>Collection</h1>
  </CollectionLayout>  )
}

export default Collection
