import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import CarCard from './CarCard';
import { motion } from 'framer-motion';

const FeaturedSection = () => {
  const { cars } = useAppContext();
  const navigate = useNavigate();

  return (
    <motion.section
      className="flex flex-col items-center py-24 px-6"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.h2
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Featured Cars
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {cars.slice(0, 6).map((car, index) => (
          <motion.div
            key={car._id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeaturedSection;
