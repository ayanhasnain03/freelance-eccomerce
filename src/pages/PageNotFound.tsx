
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl text-gray-600">Oops! Page Not Found</h2>
        <p className="mt-2 text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-white bg-rose-600 rounded-md shadow  focus:outline-none "
          >
            <FaHome className="mr-2" /> Go Back Home
          </Link>
        </div>


      </div>
    </div>
  );
};

export default PageNotFound;
