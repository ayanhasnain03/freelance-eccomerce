import { Link } from 'react-router-dom'
import Highlighter from '../shared/Highlight'
import { motion } from 'framer-motion'

const MobileLandingPage = () => {
  return (
    <div className="md:hidden  bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[60vh]"
      >
        <img 
          src="hero2.webp" 
          alt="Mobile Banner" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col justify-center items-center text-center px-6">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-5xl font-agu mb-4 drop-shadow-lg"
          >
            Unleash Your Style
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white text-lg mb-8 font-inter leading-relaxed"
          >
            Discover our exclusive <Highlighter animationDuration={1.2} text="Collection" /> of fashion. 
            Free <Highlighter animationDuration={1.2} text="Shipping" /> on orders over $50!
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/shop">
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Shop Now
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default MobileLandingPage