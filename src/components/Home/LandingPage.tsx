import { lazy } from "react";

const MobileLandingPage = lazy(() => import("./MobileLandingPage"));
const LandingPage = () => {
  return (
    <div className="bg-white text-black max-w-7xl mx-auto">
      <div className="flex flex-row justify-around gap-8 mt-5">
        <div className="hidden h-[550px] w-1/4 md:flex items-center justify-center overflow-hidden">
          <img
            src="hero.webp"
            alt="Featured Product"
            className="object-cover h-full w-full filter grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <div className="hidden h-[550px] w-1/2 md:flex flex-col items-center justify-between">
          <div className="h-1/3  w-full">
            <img
              src="hero3.webp"
              alt="Exclusive Offers"
              className="object-cover h-full w-full"
            />
          </div>

          <div className="text-center text-black px-8 flex flex-col gap-2">
            <h1 className="main-title font-agu text-4xl">Unleash Your Style</h1>
            <p className="text-[15px]  mt-1 font-inter">
              Discover our exclusive collection of fashion. Free shipping on
              orders over $50!
            </p>
            <button className="  font-inter underline text-semibold text-rose-600 transition duration-300">
              Shop Now
            </button>
          </div>

          <div className="h-1/3  w-full">
            <img
              src="hero4.webp"
              alt="Exclusive Offers"
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        <div className="hidden md:block h-[550px] w-1/4">
          <img
            src="hero2.webp"
            alt="New Arrivals"
            className="object-cover h-full filter grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>

      <MobileLandingPage />
    </div>
  );
};

export default LandingPage;
