import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';

const CarDetails = () => {
  const { id } = useParams();
  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  } = useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY || '₹';

  



  const fetchCarById = async () => {
    try {
      const res = await axios.get(`/api/cars/${id}`);
      setCar(res.data);
    } catch (err) {
      console.error("Failed to load car:", err);
    }
  };

  useEffect(() => {
    const foundCar = cars.find((c) => c._id === id);
    if (foundCar) {
      setCar(foundCar);
    } else {
      // Fallback if user visits directly
      fetchCarById();
    }
  }, [cars, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const {data} = await axios.post('/api/bookings/create',{
        car:id,
        pickupDate,
        returnDate

       })

       if(data.success){
        toast.success(data.message)
        navigate('/my-bookings')
       }
       else{
        toast.error(data.message)
       }
    } catch (error) {
        toast.error(error.message)
    }
  };

  if (!car) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="Back" className="rotate-180 opacity-65 h-4" />
        Back to all cars
      </button>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Car image + details */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />

          {/* Car details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
              <p className="text-gray-500 text-lg">{car.category} • {car.year}</p>
            </div>

            <hr className="border-borderColor my-6" />

            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div key={text} className="flex flex-col items-center bg-light p-4 rounded-lg">
                  <img src={icon} alt={text} className="h-5 mb-2" />
                  <span className="text-sm text-gray-600">{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-medium mb-3">Description</h2>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Features list */}
            <div>
              <h2 className="text-xl font-medium mb-3">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} className="h-4 mr-2" alt="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking form */}
        <form onSubmit={handleSubmit} className="shadow-lg h-max sticky top-20 rounded-xl p-6 space-y-6 text-gray-500 bg-white">
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}{car.pricePerDay}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input 
              type="date"
              id="pickup-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              min={new Date().toISOString().split('T')[0]}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
          >
            Book Now
          </button>

          <p className="text-center text-sm">No credit card required to reserve</p>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
