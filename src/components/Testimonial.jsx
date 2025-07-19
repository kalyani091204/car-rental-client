import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Testimonial = () => {
  const testimonials = [
    {
      name: 'Sahili Verma',
      location: 'Bangalore',
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: 'Aditi Patil',
      location: 'Pune',
      image: assets.testimonial_image_2,
      testimonial:
        'CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!',
    },
    {
      name: 'Mayuri Shete',
      location: 'Mumbai',
      image: assets.testimonial_image_1,
      testimonial:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      {/* Title with line animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-center justify-center mb-10"
      >
        <div className="flex-grow h-px bg-gray-300"></div>
        <h2 className="mx-4 text-xl md:text-2xl font-semibold text-center text-gray-800">
          What Our Customers Say
        </h2>
        <div className="flex-grow h-px bg-gray-300"></div>
      </motion.div>

      {/* Subtitle animation */}
      <motion.p
        className="text-center text-gray-500 max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Discover why discerning travelers choose CarRental for their premium vehicle experience across India.
      </motion.p>

      {/* Testimonial cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className={`bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500 ${
              index === 1 ? 'scale-105 shadow-xl border border-blue-100' : ''
            }`}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-lg font-medium">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <img
                    key={i}
                    src={assets.star_icon}
                    alt="star-icon"
                    className="h-4 w-4"
                  />
                ))}
            </div>

            {/* Feedback Text */}
            <p className="text-gray-600 mt-4 text-sm font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
