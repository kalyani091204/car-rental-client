import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');
  const isSearchData = pickupLocation && pickupDate && returnDate;

  const { axios: contextAxios } = useAppContext();
  const [input, setInput] = useState('');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState([]);

  const searchAvailability = async () => {
    try {
      const { data } = await contextAxios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast.info('No cars available');
        }
      }
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchAvailability();
    }
  }, [pickupLocation, pickupDate, returnDate]);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars');
      const availableCars = response.data.filter((car) => car.isAvailable === true);
      setCars(availableCars);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const finalCars = (isSearchData ? filteredCars : cars).filter((car) =>
    (car.brand + car.model + car.category).toLowerCase().includes(input.toLowerCase())
  );

  return (
    <motion.div
      className='w-full bg-light py-20 px-4 md:px-10 lg:px-20 xl:px-40 overflow-x-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Title Section - centered */}
      <motion.div
        className="mb-6 w-full max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Title
          title=' Available Cars'
          subTitle='Browse our selection of premium vehicles available for your next adventure'
        />
      </motion.div>

      {/* Search Input */}
      <motion.div
        className='flex items-center bg-white px-4 py-2 max-w-2xl mx-auto rounded-full shadow-md'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <img src={assets.search_icon} alt='Search' className='w-4 h-4 mr-2' />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type='text'
          placeholder='Search by make, model, or features'
          className='w-full h-full outline-none text-gray-500'
        />
        <img src={assets.filter_icon} alt='Filter' className='w-4 h-4 ml-2' />
      </motion.div>

      {/* Car Grid Section */}
      <div className='w-full mt-10'>
        {loading ? (
          <motion.p
            className='text-gray-500 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading cars...
          </motion.p>
        ) : finalCars.length === 0 ? (
          <motion.p
            className='text-gray-500 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No cars available
          </motion.p>
        ) : (
          <>
            <motion.p
              className='text-gray-500 mb-4 text-center'
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Showing {finalCars.length} Cars
            </motion.p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {finalCars.map((car, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Cars;
