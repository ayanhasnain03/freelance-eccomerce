import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarProps {
  rating: number;
}

const Star: React.FC<StarProps> = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStars;

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-400 w-5 h-5" />
        ))}

      {Array(halfStars)
        .fill(null)
        .map((_, index) => (
          <FaStarHalfAlt
            key={`half-${index}`}
            className="text-yellow-400 w-5 h-5"
          />
        ))}

      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <FaRegStar
            key={`empty-${index}`}
            className="text-yellow-400 w-5 h-5"
          />
        ))}
    </div>
  );
};

export default Star;
