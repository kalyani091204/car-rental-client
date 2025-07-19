import React, { useState } from 'react';
import { motion } from 'framer-motion'; // ✅ Import Motion
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const cityList = ['Mumbai', 'Pune', 'Delhi', 'Bangalore'];

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate);
  };

  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-semibold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        Luxury Cars on Rent
      </motion.h1>

      {/* Search Form */}
      <motion.form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-lg md:rounded-full w-full max-w-3xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Pickup Location */}
        <div className="flex flex-col items-start w-full md:w-auto">
          <label className="text-sm mb-1 text-gray-600">Pickup Location</label>
          <select
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-60 text-left appearance-none"
          >
            <option value="">PickUp Location</option>
            {cityList.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <p className="px-1 text-sm text-gray-500">
            {pickupLocation ? pickupLocation : 'Please select location'}
          </p>
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="pickup-date" className="text-sm text-gray-600">Pick-up Date</label>
          <input
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            type="date"
            id="pickup-date"
            min={new Date().toISOString().split('T')[0]}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
            required
          />
        </div>

        {/* Return Date */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="return-date" className="text-sm text-gray-600">Return Date</label>
          <input
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            type="date"
            id="return-date"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
            required
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer"
        >
          <img src={assets.search_icon} alt="search" className="w-4 h-4 brightness-200" />
          Search
        </button>
      </motion.form>

      {/* Hero Car Image */}
      <motion.img
        src={assets.main_car}
        alt="car"
        className="max-h-[300px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      />
    </motion.div>
  );
};

export default Hero;
