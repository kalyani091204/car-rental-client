import React from 'react';
import { assets } from '../assets/assets'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'; 
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => { navigate(`/car-details/${car._id}`); scrollTo(0, 0); }}
      className="group rounded-xl overflow-hidden shadow-lg cursor-pointer relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Car Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          whileHover={{ scale: 1.05 }}
        />

        {/* Availability Badge */}
        {car.isAvailable && (
          <motion.div
            className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Available Now
          </motion.div>
        )}

        {/* Price Badge */}
        <motion.div
          className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-semibold">{currency}{car.pricePerDay}</span>
          <span className="text-sm text-white/80"> / day</span>
        </motion.div>
      </div>

      {/* Car Info */}
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">{car.brand} {car.model}</h3>
            <p className="text-gray-500 text-sm">{car.category} • {car.year}</p>
          </div>
        </div>

        {/* Car Features */}
        <motion.div
          className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center text-sm">
            <img src={assets.users_icon} alt="Seats" className="h-4 mr-2" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.fuel_icon} alt="Fuel" className="h-4 mr-2" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.car_icon} alt="Transmission" className="h-4 mr-2" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.location_icon} alt="Location" className="h-4 mr-2" />
            <span>{car.location}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CarCard;
