import React from 'react';
import { motion } from 'framer-motion'; // ✅ Import framer-motion
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <motion.div
      className='flex flex-col md:flex-row items-center justify-between px-8 md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Text Section */}
      <motion.div
        className='text-white max-w-xl'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className='text-3xl font-medium'>Do You Own a Luxury Car?</h2>
        <p className='mt-2'>
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className='mt-2 max-w-md'>
          We take care of insurance, driver verification and secure payments so you can earn passive income, stress-free.
        </p>
        <button className='px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer'>
          List your car
        </button>
      </motion.div>

      {/* Image Section */}
      <motion.img
        src={assets.banner_car_image}
        alt="Luxury Car"
        className='max-h-52 md:mt-0 mt-10'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </motion.div>
  );
};

export default Banner;
