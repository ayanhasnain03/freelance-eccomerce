import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Fav = ({ isFav = false }: { isFav: boolean }) => {
  return (
    <>
      {isFav ? (
        <FaHeart style={{ color: "red" }} />
      ) : (
        <FaRegHeart style={{ color: "red" }} />
      )}
    </>
  );
};

export default React.memo(Fav);
