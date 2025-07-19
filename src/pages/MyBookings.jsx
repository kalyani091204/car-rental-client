import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { axios, currency } = useAppContext();

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <motion.div
      className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mx-auto'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title with animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Title
          title='My Bookings'
          subTitle='View and manage your all car bookings'
          align='center'
        />
      </motion.div>

      <div>
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            className='flex flex-col md:flex-row gap-6 p-6 border border-borderColor rounded-xl mt-5 first:mt-12 bg-white justify-between'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Car Image + Basic Info */}
            <div className='md:w-1/3'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img
                  src={booking.car.image}
                  alt={`${booking.car.brand} ${booking.car.model}`}
                  className='w-full h-auto aspect-video object-cover'
                />
              </div>
              <p className='text-lg font-semibold'>
                {booking.car.brand} {booking.car.model}
              </p>
              <p className='text-gray-500 text-sm'>
                {booking.car.year} • {booking.car.category} • {booking.car.location}
              </p>
            </div>

            {/* Booking Info */}
            <div className='md:w-1/2 flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light text-sm rounded font-medium'>
                  Booking #{index + 1}
                </p>
                <p
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    booking.status === 'confirmed'
                      ? 'bg-green-400/15 text-green-600'
                      : 'bg-red-400/15 text-red-600'
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className='flex items-center gap-2'>
                <img
                  src={assets.calendar_icon_colored}
                  alt='calendar'
                  className='w-4 h-4'
                />
                <div>
                  <p className='text-gray-500 text-xs'>Rental Period</p>
                  <p className='text-sm font-medium'>
                    {booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <img
                  src={assets.location_icon_colored}
                  alt='location'
                  className='w-4 h-4'
                />
                <div>
                  <p className='text-gray-500 text-xs'>Pick-up Location</p>
                  <p className='text-sm font-medium'>{booking.car.location}</p>
                </div>
              </div>
            </div>

            {/* Price & Booking Date */}
            <div className='md:w-1/5 text-right self-start'>
              <p className='text-gray-500 text-sm'>Total Price</p>
              <h1 className='text-xl font-semibold text-primary'>
                {currency}
                {booking.price}
              </h1>
              <p className='text-gray-500 text-sm'>
                Booked on {booking.createdAt.split('T')[0]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyBookings;
