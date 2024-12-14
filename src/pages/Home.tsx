import { lazy } from "react";



const LandingPage = lazy(() => import("../components/Home/LandingPage"));
const TopSelling = lazy(() => import("../components/Home/TopSelling"));
const Home = () => {
  return (
    <div className=" bg-white h-full overflow-x-hidden">
 


<div>
  <LandingPage />
</div>

<div>

</div>

<div className="mt-10">
  <h1 className="text-6xl font-bold text-center font-dancing">Best Sellers</h1>
  <TopSelling/>
</div>

<div className="">

</div>
    

    </div>
  );
};

export default Home;
