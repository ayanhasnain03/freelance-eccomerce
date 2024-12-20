
import { Link } from 'react-router-dom'
import Stbtn from '../shared/Buttons/Stbtn'
import { motion } from 'framer-motion'
const newArrivalsData = [
  { id: 1, title: 'Full Sleeve', image: 'card.png' },
  { id: 2, title: 'Short Sleeve', image: 'arrival2.png' },
  { id: 3, title: 'Hoodie', image: 'arrival3.png' },
  { id: 4, title: 'Sweatshirt', image: 'card.png' },
]

const NewArrivals = () => {
  return (
    <motion.div className=" h-full w-full relative mt-10 p-2 " 
    initial={{ opacity: 0, y: -50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.8 }} 
    
    >
<Stbtn text='New Arrivals'/>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 ">
        {newArrivalsData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform"
          >
    
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-opacity duration-300 brightness-75 cursor-pointer"
            />
         
            <div className="absolute top-1/2 underline underline-offset-4 left-1/2 transform -translate-x-1/2 text-white text-lg md:text-sm font-inter z-10  px-1 py-1 rounded-md  transition-all duration-300">

<Link to={`/collections/${item.title}`}>{item.title}</Link>

            </div>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default NewArrivals
