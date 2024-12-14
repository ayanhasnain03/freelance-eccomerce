import Stbtn from "../shared/Buttons/Stbtn";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const WoMenCategory = () => {
  const menCategory = [
    { name: "Hoodies", img: "womenCat1.png" },
    { name: "T-Shirts", img: "womenCat2.png" },
    { name: "Jackets", img: "womenCat1.png" },
    { name: "Pants", img: "womenCat2.png" },
  ];

  return (
    <div className="p-8 relative">
      <Stbtn text="Categories For Women" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
        {menCategory.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-2 rounded-lg bg-white shadow-lg  "
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={item.img}
              alt={item.name}
              className="w-full h-[250px] object-cover rounded-lg "
            />
            <div className="mt-4 flex justify-between px-4 w-full items-center">
              <p className="text-sm font-semibold text-gray-900">{item.name}</p>
              <FaArrowRightLong className="text-gray-900 hover:text-primary-red cursor-pointer" />
            </div>
          </motion.div>
        ))}
        <p className="text-gray-900 hover:text-primary-red cursor-pointer absolute bottom-0 md:top-10 right-4">More</p>
      </div>
    </div>
  );
};

export default WoMenCategory
