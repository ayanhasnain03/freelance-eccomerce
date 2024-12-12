import { lazy, Suspense } from "react";
import TopSelling from "../components/Home/TopSelling";
import BentoGrid from "../components/Home/BentoGrid";
import CardLoader from "../components/shared/Loader/CardLoader";
import Loader from "../components/shared/Loader/Loader";
import { Link } from "react-router-dom";

// Lazy-load components
const MarqueeReviews = lazy(() => import("../components/Home/Marquee"));
const SalesCarouselCard = lazy(
  () => import("../components/Carousel/SalesCarouselCard")
);
const CountdownTimer = lazy(
  () => import("../components/shared/TImer/CountdownTimer")
);
const ProductCarousel = lazy(
  () => import("../components/Carousel/HomeCarousel")
);
const NewArrivals = lazy(() => import("../components/Home/NewArrivals"));

const LoadingSpinner = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="h-full w-full bg-white overflow-x-hidden">
      <div className="w-full border h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="h-full w-full mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <ProductCarousel />
          </Suspense>

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-center font-integral text-black">
              New Arrivals
            </h1>
            <Suspense fallback={<CardLoader />}>
              <NewArrivals />
            </Suspense>
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-center font-integral text-black mt-4">
              Top Selling
            </h1>
            <Suspense fallback={<CardLoader />}>
              <TopSelling />
            </Suspense>
          </div>

          <div className="flex items-center flex-col gap-4 mt-8 bg-white">
            <div className="py-6 text-center">
              <div className="border-b pb-1 border-red-600">
                <h2 className="text-4xl font-noto text-red-600">
                  Exciting SALES
                </h2>
                <p className="mt-1">
                  <span className="text-red-600 font-normal text-sm">
                    Up to 50% OFF on Bestsellers
                  </span>
                </p>
              </div>

              <div className="mt-6">
                <Suspense fallback={<LoadingSpinner />}>
                  <CountdownTimer />
                </Suspense>
              </div>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <SalesCarouselCard />
            </Suspense>
            <div>
              <button className="mt-1 bg-gray-900 hover:bg-gray-700 text-center text-white font-bold py-1.5 px-4 ">
                <span className=" font-semibold text-lg font-noto">
                  Show All Products
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Suspense fallback={<LoadingSpinner />}>
              <BentoGrid />
            </Suspense>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-center font-noto">
              Top Reviews
            </h1>
            <Suspense fallback={<Loader />}>
              <MarqueeReviews />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
