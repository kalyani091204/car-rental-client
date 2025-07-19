import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <motion.h1
        className="md:text-4xl text-2xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Never Miss a Deal!
      </motion.h1>

      <motion.p
        className="md:text-lg text-gray-500/70 pb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </motion.p>

      <motion.form
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 
          outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          className="md:px-12 px-8 h-full text-white 
          bg-primary hover:bg-primary-dull transition-all cursor-pointer
          rounded-md rounded-l-none"
        >
          Subscribe
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Newsletter;
