import React, { useEffect, useMemo, useState, Suspense } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useCreateFavMutation } from "../../../redux/api/productApi";
import { addtoWishList, removeFromWishList } from "../../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const ProductCard = React.lazy(() => import("./ProductCard"));

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  rating: number;
  discount: number;
}

interface ProductLayoutProps {
  data: {
    products: Product[];
  };
}

interface UserState {
  user: {
    wishlist: { _id: string }[];
  };
}

const API_BASE_URL = import.meta.env.VITE_SERVER;

const ProductLayout: React.FC<ProductLayoutProps> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //@ts-ignore
  const {wishlist} = useSelector((state: UserState) => state.user);
  const [createFav] = useCreateFavMutation();
  const [loading, setLoading] = useState(true);

  const handleFav = async (id: string) => {

    dispatch(addtoWishList(id));

    try {
      const res = await createFav({ productId: id }).unwrap();
      toast.success(res?.data?.message || "Added to favorites!");
    } catch (error: any) {
      if(error?.data?.message === "Unauthorized"){
        navigate("/auth");
        
      }
      dispatch(removeFromWishList(id));
      toast.error(error?.data?.message || "Failed to add to favorites.");
    }
  };


  const removeFromFav = async (id: string) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/v1/user/wishlist`,
        { productId: id },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(removeFromWishList(id));
      toast.success(res?.data?.message || "Removed from favorites!");
    } catch (error: any) {
      toast.error(error?.message || "Failed to remove from favorites.");
    }
  };

  

  const productCards = useMemo(() => {
    return data?.products?.map((product) => (
      
      <ProductCard
        key={product._id}
        description={product.description}
        name={product.name}
        price={product.price - (product.price * product.discount) / 100}
        image={product.images[0]?.url || ""}
        rating={product.rating}
        discount={product.discount}
        productId={product._id}
        //@ts-ignore
        isFav={wishlist.includes(product._id)}
        handleFav={handleFav}
        removeFromFav={removeFromFav}
        isCart={false}
      />
    ));
  }, [data?.products, wishlist, handleFav, removeFromFav]);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  if (data?.products?.length === 0 && !loading) {
    return (
      <div className="text-center w-full py-10">
        <p className="text-xl text-gray-700 font-medium">
          No products found. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full h-full">
      {loading ? (
        Array.from({ length: data?.products?.length || 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 h-64 w-[300px] rounded-md"
          />
        ))
      ) : (
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-full">
              {Array.from({ length: data?.products?.length || 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 h-64 w-[300px] rounded-md"
                />
              ))}
            </div>
          }
        >
          {productCards}
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(ProductLayout);
