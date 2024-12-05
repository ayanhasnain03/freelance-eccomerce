import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarProps {
  rating: number;
}

const Star: React.FC<StarProps> = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStars;

  const starElements = [
    ...Array(fullStars).fill(<FaStar className="text-yellow-400 w-5 h-5" />),
    ...Array(halfStars).fill(<FaStarHalfAlt className="text-yellow-400 w-5 h-5" />),
    ...Array(emptyStars).fill(<FaRegStar className="text-yellow-400 w-5 h-5" />),
  ];

  return (
    <div className="flex">
      {starElements.map((star, index) => (
        <div key={index}>{star}</div>
      ))}
    </div>
  );
};

export default React.memo(Star);
