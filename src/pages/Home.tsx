import { lazy, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../components/shared/Loader/Loader";

const Highlighter = lazy(() => import("../components/shared/Highlight"));

const LandingPage = lazy(() => import("../components/Home/LandingPage"));
const TopSelling = lazy(() => import("../components/Home/TopSelling"));
const NewArrivals = lazy(() => import("../components/Home/NewArrivals"));

const SaleProducts = lazy(() => import("../components/Carousel/SalesCarouselCard"));
const WoMenCategory = lazy(() => import("../components/Home/WoMenCategory"));
const MenCategory = lazy(() => import("../components/Home/MenCategory"));

const Home = () => {
  useEffect(() => {
    const lazyLoadImages = () => {
      const images = document.querySelectorAll("img[data-src]");
      const config = {
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.01,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            //@ts-ignore
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      }, config);

      images.forEach((img) => observer.observe(img));
    };

    lazyLoadImages();

    return () => {
    
      const observer = new IntersectionObserver(() => {}, {});
      observer.disconnect();
    };
  }, []);

  return (
   <>



    <main className="bg-white min-h-screen w-full flex flex-col justify-center overflow-x-hidden">
      <Suspense fallback={<div>

<Loader />

      </div>}>
      
        <section className="overflow-hidden">
          <LandingPage />
        </section>

        <section className="w-full">
          <NewArrivals />
        </section>

        <section>
          <SaleProducts />
        </section>

        <section className="overflow-hidden mt-6">
          <TopSelling />
        </section>

        <section className="flex flex-col md:flex-row items-center justify-center w-full py-16 px-2 backdrop-blur-lg">
          <motion.div
            className="w-full md:w-1/2 p-8 text-center md:text-left space-y-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
              Discover the Luxe Collection
            </h1>
            <p className="text-lg md:text-xl leading-relaxed">
              Transform your wardrobe with{" "}
              <Highlighter animationDuration={1} text="Luxury" lineStyle="strikethrough" strokeWidth={8}/>, trendsetting pieces crafted for the modern{" "}
              <Highlighter animationDuration={1} text="fashionista" lineStyle="strikethrough" strokeWidth={8} />. Elevate your style with{" "}
              <Highlighter animationDuration={1} text="Premium" strokeWidth={8} lineStyle="strikethrough"/> designs.
            </p>
            <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-gray-900 hover:text-white">
              Shop Now
            </button>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img
              src="model.jpg"
              alt="Premium Fashion Model"
              className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
            />
          </motion.div>
        </section>

     <section>
     <MenCategory />

     </section>
      

     <section>
     <WoMenCategory />

     </section>
     
      </Suspense>
    </main>
   </>
  );
};

export default Home;
