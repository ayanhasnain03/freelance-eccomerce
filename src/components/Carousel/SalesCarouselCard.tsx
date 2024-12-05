import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import { lazy, memo } from "react";
const Star = lazy(() => import("../cards/Star"));
const Fav = lazy(() => import("../cards/Fav"));
const SalesCarouselCard = () => {
  const data = [
    {
      id: "1",
      name: "Casual Cotton T-Shirt",
      description: "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      discount: 10,
      rating: 4.5,
      image: "card.png",
      link: "/product/casual-cotton-t-shirt",
      isFav: false,
    },
    {
      id: "2",
      name: "Casual Cotton T-Shirt",
      description: "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      discount: 10,
      rating: 4.5,
      image: "card.png",
      link: "/product/casual-cotton-t-shirt",
      isFav: true,
    },
    {
      id: "3",
      name: "Casual Cotton T-Shirt",
      description: "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      discount: 10,
      rating: 4.5,
      image: "card.png",
      link: "/product/casual-cotton-t-shirt",
      isFav: true,
    },
    {
      id: "4",
      name: "Casual Cotton T-Shirt",
      description: "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      discount: 10,
      rating: 4.5,
      image: "card.png",
      link: "/product/casual-cotton-t-shirt",
      isFav: true,
    },
    {
      id: "5",
      name: "Casual Cotton T-Shirt",
      description: "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      discount: 10,
      rating: 4.5,
      image: "card.png",
      link: "/product/casual-cotton-t-shirt",
      isFav: true,
    },
    {
      id: "6",
      name: "Casual Cotton T-Shirt",
      description: "A comfortable and breathable cotton T-shirt, perfect for casual wear.",
      price: 15,
      discount: 10,
      rating: 4.5,
      image: "card.png",
      link: "/product/casual-cotton-t-shirt",
      isFav: true,
    },

  ];

  return (
    <div className="relative w-full mx-auto">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {data.map((product) => {

            const discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);
            const originalPrice = product.price.toFixed(2);

            return (
              <CarouselItem
                key={product.id}
                className="p-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/5"
              >
                <Card className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <CardContent className="p-3 flex flex-col items-center">
                    <Link to={product.link} className="w-full h-full">
                      <div className="w-full h-[160px] relative">
                        <div className="absolute -top-3 left-1 bg-rose-500 text-white px-2 py-1 text-xs rounded-r-xl z-10 shadow-md">
                          -{product.discount}%
                        </div>

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2">
                          <Fav isFav={product.isFav} />
                        </div>
                      </div>
                      <div className="p-2 text-center">
                        <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                        <div className="flex items-center justify-center mt-1">
                          <p className="text-base font-medium text-green-600">
                            ${discountedPrice}
                          </p>
                          <p className="ml-2 text-xs line-through text-gray-500">
                            ${originalPrice}
                          </p>
                        </div>
                        <div className="mt-1">
                          <Star rating={product.rating} />
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-6 top-1/2 flex items-center justify-center text-black bg-gray-200 p-3 rounded-full hover:bg-gray-400">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute -right-6 top-1/2 flex items-center justify-center text-black bg-gray-200 p-3 rounded-full hover:bg-gray-400">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
};
export default memo(SalesCarouselCard);
