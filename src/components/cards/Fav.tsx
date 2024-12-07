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
        <span
          onClick={() => removeFromFav(productId)}
          onKeyDown={(e) => e.key === "Enter" && removeFromFav(productId)}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Remove from favorites"
        >
          <FaHeart style={{ color: "red" }} />
        </span>
      ) : (
        <span
          onClick={() => addToFav(productId)}
          onKeyDown={(e) => e.key === "Enter" && addToFav(productId)}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Add to favorites"
        >
          <FaRegHeart style={{ color: "red" }} />
        </span>
      )}
    </>
  );
};

export default React.memo(Fav);
