import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars');
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


   const toggleAvailability = async (carId) => {
  try {
    const { data } = await axios.post(
      '/api/owner/toggle-car',
      { carId },
      { headers: { 'Content-Type': 'application/json' } } // ✅ important
    );

    if (data.success) {
      toast.success(data.message);
      fetchOwnerCars();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};



    const deleteCar = async (carId) => {
    try {

      const confirm = window.confirm('Are you sure you want to delete this car?')

      if(!confirm) return null
      const { data } = await axios.post('/api/owner/delete-car',{carId});
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className='border-t'>
                <td className='p-4'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={car.image}
                      alt={car.model}
                      className='w-14 h-10 object-cover rounded'
                    />
                    <div>
                      <h2 className='font-medium text-black'>
                        {car.brand} {car.model}
                      </h2>
                      <p className='text-xs text-gray-500'>
                        {car.seating_capacity} • {car.transmission}
                      </p>
                    </div>
                  </div>
                </td>

                <td className='p-4 max-md:hidden'>{car.category}</td>
                <td className='p-4'>₹{car.pricePerDay}/day</td>

                <td className='p-4 max-md:hidden'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvailable
                        ? 'bg-green-100 text-green-500'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {car.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                <td className='p-4'>
                  <div className='flex items-center gap-4'>
                    <img onClick={()=> toggleAvailability(car._id)}
                      src={car.isAvailable ? assets.eye_close_icon: assets.eye_icon}
                      alt='toggle'
                      className='cursor-pointer'
                    />
                    <img onClick={()=> deleteCar(car._id)}
                      src={assets.delete_icon}
                      alt='delete'
                      className='cursor-pointer'
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
