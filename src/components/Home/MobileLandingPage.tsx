
import { Link } from 'react-router-dom'
import Highlighter from '../shared/Highlight'

const MobileLandingPage = () => {
  return (

    <div className="md:hidden">

    <div className="relative">
      <img src="hero.webp" alt="Mobile Banner" className="w-full h-auto object-cover" />
      
 
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-white text-4xl font-agu mb-4">
          Unleash Your Style
        </h2>
        <p className="text-white text-lg mb-6 font-inter">
          Discover our exclusive <Highlighter animationDuration={1} text="Collection" /> of fashion. Free <Highlighter animationDuration={1} text="Shipping" /> on orders over $50!
        </p>
  
  
  <Link to="/shop">
          <button className="bg-rose-600 text-white px-6 py-2 rounded-md transition duration-300">
            Shop Now
          </button>
        </Link>
  
  
      </div>
    </div>
  </div>
  )
}

export default MobileLandingPage