import { lazy, Suspense } from "react";


const SalesCarouselCard = lazy(() => import("../components/Carousel/SalesCarouselCard"));
const CountdownTimer = lazy(() => import("../components/shared/TImer/CountdownTimer"));
const ProductCarousel = lazy(() => import("../components/Carousel/HomeCarousel"));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-primaryBg">
      <div className="w-full border h-[80vh] px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="h-full w-full mx-auto">
          {/* Wrap the lazy-loaded components with Suspense */}
          <Suspense fallback={<LoadingSpinner />}>
            <ProductCarousel />

            <div className="flex items-center flex-col gap-4 mt-8 bg-primaryBg">
              <div className="py-6 text-center">
                <div className="border-b pb-1 border-red-600">
                  <h2 className="text-4xl font-candal text-red-600">Exciting SALES</h2>
                  <p className="mt-1">
                    <span className="text-red-600 font-semibold text-lg font-noto">
                      Up to 50% OFF on Bestsellers
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <CountdownTimer />
                </div>
              </div>

              <SalesCarouselCard />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
