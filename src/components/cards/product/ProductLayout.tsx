import axios from "axios";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateFavMutation } from "../../../redux/api/productApi";
import {
  addtoWishList,
  removeFromWishList,
} from "../../../redux/reducers/userReducer";
import Loader from "../../shared/Loader/Loader";

const ProductCard = React.lazy(() => import("./ProductCard"));

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: [];
  rating: number;
  discount: number;
  brand: string;
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
  const { wishlist } = useSelector((state: UserState) => state.user);
  const [createFav] = useCreateFavMutation();
  const [loading, setLoading] = useState(true);

  const handleFav = async (id: string) => {
    dispatch(addtoWishList(id));

    try {
      const res = await createFav({ productId: id }).unwrap();
      toast.success(res?.data?.message || "Added to favorites!");
    } catch (error: any) {
      if (error?.data?.message === "Unauthorized") {
        navigate("/auth");
      }
      dispatch(removeFromWishList(id));
      toast.error(error?.data?.message || "Failed to add to favorites.");
    }
  };

  const removeFromFav = async (id: string) => {
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/api/v1/user/wishlist/${id}`,
        { withCredentials: true }
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
        brand={product.brand}
        description={product.description}
        name={product.name}
        price={Math.floor(
          product.price - (product.discount / 100) * product.price
        )}
        image={product.images}
        rating={product.rating}
        discount={product.discount}
        productId={product._id}
        //@ts-ignore
        isFav={wishlist.includes(product._id)}
        handleFav={handleFav}
        removeFromFav={removeFromFav}
        //@ts-ignore
        isCart={false}
      />
    ));
  }, [data?.products, wishlist, handleFav, removeFromFav]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
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
    <div className="flex flex-col md:flex-row  flex-wrap items-center justify-items-start gap-2 mt-4  ">
      {loading ? (
        Array.from({ length: data?.products?.length || 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 h-[250px] w-[200px] md:ml-0 ml-12 shadow-md flex justify-center items-center"
          >
            <Loader />
          </div>
        ))
      ) : (
        <Suspense
          fallback={
            <div className="flex flex-col md:flex-row  flex-wrap items-center justify-items-start gap-8 mt-4  ">
              {Array.from({ length: data?.products?.length || 8 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 h-[250px] w-[200px] rounded-lg shadow-md"
                  />
                )
              )}
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
