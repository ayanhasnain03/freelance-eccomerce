import { lazy } from "react";
import { cn } from "../../lib/utils";

const Marquee = lazy(() => import("../ui/marquee"));

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
    rating: 5,
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
    rating: 4,
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
    rating: 5,
  },
  {
    name: "Jane",
    username: "@jane",
    body: "The creativity here is unmatched. Fantastic job!",
    img: "https://avatar.vercel.sh/jane",
    rating: 5,
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "An absolute masterpiece. I’m beyond impressed!",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  {
    name: "James",
    username: "@james",
    body: "This is mind-blowing. A unique experience for sure!",
    img: "https://avatar.vercel.sh/james",
    rating: 4,
  },
];

const defaultAvatar = "https://avatar.vercel.sh/placeholder";

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  rating: number;
}) => {
  return (
    <figure
      className={cn(
        "relative w-full h-[160px] cursor-pointer overflow-hidden rounded-xl p-4 shadow-lg transition-transform duration-200 hover:scale-105",
        "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <img
          className="rounded-full border-2 border-gray-300 dark:border-gray-600"
          width="48"
          height="48"
          alt={name}
          src={img || defaultAvatar}
        />
        <div className="flex flex-col">
          <figcaption className="text-base font-semibold text-gray-900 dark:text-white">{name}</figcaption>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-gray-700 dark:text-gray-300 italic">{body}</blockquote>
      <div className="mt-3 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={i < rating ? "gold" : "gray"}
            className="h-5 w-5 transition-transform duration-200 hover:scale-125 hover:drop-shadow-md"
          >
            <path d="M12 .587l3.668 7.451 8.224 1.194-5.956 5.804 1.408 8.214L12 18.897l-7.344 3.853 1.408-8.214-5.956-5.804 8.224-1.194z" />
          </svg>
        ))}
      </div>
    </figure>
  );
};

export default function MarqueeReviews() {
  return (
    <div className="relative flex h-full my-4 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900"></div>
    </div>
  );
}
