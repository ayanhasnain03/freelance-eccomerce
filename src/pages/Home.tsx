import { lazy, Suspense } from "react";
import ProductCarousel from "../components/Carousel/HomeCarousel";


// const SalesCarouselCard = lazy(() => import("../components/Carousel/SalesCarouselCard"));
// const CountdownTimer = lazy(() => import("../components/shared/TImer/CountdownTimer"));
// const ProductCarousel = lazy(() => import("../components/Carousel/HomeCarousel"));

// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center h-screen">
//     <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//   </div>
// );

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-primaryBg">
      <div className="w-full border h-[80vh] px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="h-full w-full mx-auto">
          {/* Wrap the lazy-loaded components with Suspense */}
 <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
