import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface FavProps {
  isFav: boolean;
  addToFav: (id: string) => void;
  removeFromFav: (id: string) => void;
  productId: string;
}

const Fav: React.FC<FavProps> = ({ isFav, addToFav, removeFromFav, productId }) => {
  return (
    <>
      {isFav ? (
        <button
          onClick={() => removeFromFav(productId)}
          className="cursor-pointer"
        >
          <FaHeart style={{ color: "red" }} />
        </button>
      ) : (
        <button
          onClick={() => addToFav(productId)}
          className="cursor-pointer"
        >
          <FaRegHeart style={{ color: "red" }} />
        </button>
      )}
    </>
  );
};

export default React.memo(Fav);
