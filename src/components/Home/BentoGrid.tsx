import { Link } from "react-router-dom";

const BentoGrid = () => {
  return (
    <div className="bg-white  h-full py-6 sm:py-8 lg:py-12 relative">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex absolute left-1/2 transform -translate-x-1/2 flex-col mx-auto items-center gap-2">
            <h2 className="text-2xl font-candal uppercase font-bold text-gray-800 lg:text-3xl dark:text-white">
              Browse By Dress Style
            </h2>
            <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text.
            </p>
          </div>
          <a
            href="#"
            className="inline-block rounded-lg border bg-white  px-4 py-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
          >
            More
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          <Link
            to={`/collections?category=Casual`}
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
          >
            <img
              src="bento1.png"
              loading="lazy"
              alt="Casual dress style"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-gray-800  via-transparent to-transparent opacity-50"></div>
            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
              Casual
            </span>
          </Link>

          <Link
            to={`/collections?category=Formal`}
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
          >
            <img
              src="bento2.png"
              loading="lazy"
              alt="Formal dress style"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
              Formal
            </span>
          </Link>

          <Link
            to={`/collections?category=Party`}
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
          >
            <img
              src="https://img.freepik.com/free-photo/pretty-indian-girl-black-saree-dress-posed-restaurant_627829-2050.jpg?t=st=1733430907~exp=1733434507~hmac=2420cc5253f0816d6304cd0954a5f8dfb3ddc84e13da262a6c520e874f0fa520&w=740"
              loading="lazy"
              alt="Party dress style"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
              Party
            </span>
          </Link>

          <Link
            to={`/collections?category=Accessories`}
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
          >
            <img
              src="bento4.jpg"
              loading="lazy"
              alt="Accessories dress style"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
              Accessories
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
