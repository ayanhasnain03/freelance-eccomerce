import { useNewArriavalsQuery } from "../../redux/api/productApi";
import ProductCard from "../cards/product/ProductCard";
import Loader from "../shared/Loader/Loader";

const NewArrivals = () => {
const {data,isLoading,isError} = useNewArriavalsQuery("");

  return (
<>
{
  isLoading ? (
    <Loader />
  ):(
      <div className="flex flex-col gap-8 my-4 h-full w-full items-center justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {data && data?.products?.map((item: any) => (
        <ProductCard
          key={item._id}
          productId={item._id}
          name={item.name}
          description={item.description}
          image={item.images[0].url}
          discount={0}
          price={item.price}
          rating={item.rating}
          isFav={true}
          isCart={false}
          handleFav={() => {}}
          removeFromFav={() => {}}
        />
      ))}
    </div>
  </div>
  )
}

</>

  );
};

export default NewArrivals;
