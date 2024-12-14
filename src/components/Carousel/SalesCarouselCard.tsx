import { motion } from 'framer-motion';
import CountdownTimer from '../shared/TImer/CountdownTimer';
import Stbtn from '../shared/Buttons/Stbtn';
import { Link } from 'react-router-dom';

const saleProductsData = [
  { id: 1, title: 'Full Sleeve T-shirt', price: '$30', originalPrice: '$50', image: 'card.png' },
  { id: 2, title: 'Short Sleeve T-shirt', price: '$25', originalPrice: '$40', image: 'arrival2.png' },
  { id: 3, title: 'Hoodie', price: '$45', originalPrice: '$70', image: 'arrival3.png' },
  { id: 4, title: 'Sweatshirt', price: '$35', originalPrice: '$60', image: 'card.png' },
];

const SaleProducts = () => {
  return (
    <motion.div
      className="h-auto w-full mt-10 p-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >



<Stbtn text='Christmas Sale '/>
<CountdownTimer/>


      {/* Section Title */}
      <div className="text-center mb-8">
        <p className="mt-2 text-lg text-gray-600">Exclusive offers and discounts just for you!</p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {saleProductsData.map((product) => (
          <motion.div
            key={product.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-56 object-cover transition-opacity duration-300 group-hover:opacity-80"
            />

            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-black">{product.title}</h3>
              <div className="flex justify-center items-center mt-2">
                <span className="text-xl font-semibold text-rose-600">{product.price}</span>
                <span className="ml-2 text-sm line-through text-gray-500">{product.originalPrice}</span>
              </div>
            </div>

      
            
          </motion.div>
        ))}
      </div>
      <p className='text-center mt-4'>
        <Link
          to="/collections"
          className="text-slate-600 hover:text-slate-800 transition underline duration-300"
        >
         More
        </Link>
      </p>
    </motion.div>
  );
};

export default SaleProducts;
