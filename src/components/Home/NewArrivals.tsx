import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { useNewArrivalsQuery } from '../../redux/api/productApi'
import Skeleton from '../shared/Skeleton'

const ProductLayout = React.lazy(() => import('../cards/product/ProductLayout'))
const Stbtn = React.lazy(() => import('../shared/Buttons/Stbtn'))

const NewArrivals = () => {
  const { data, isLoading, isError } = useNewArrivalsQuery('')

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load new arrivals. Please try again later.
      </div>
    )
  }

  return (
    <motion.div
      className="h-full w-full relative mt-10 p-2"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Lazy-loaded button */}
      <div className="my-10">
        <Suspense fallback={<div>Loading Button...</div>}>
          <Stbtn text="New Arrivals" />
        </Suspense>
      </div>

      {/* Show Skeleton while loading data */}
      {isLoading ? (
        <Skeleton quantity={3} />
      ) : (
        <Suspense fallback={<div>Loading Products...</div>}>
          {/* Lazy-loaded ProductLayout */}
          <ProductLayout data={data} />
        </Suspense>
      )}
    </motion.div>
  )
}

export default NewArrivals
