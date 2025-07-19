import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <motion.div
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Top Section */}
      <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={assets.logo} alt="logo" className="h-8 md:h-9" />
          <p className="max-w-80 mt-3">
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="#"><img src={assets.facebook_logo} className="w-5 h-5" alt="facebook" /></a>
            <a href="#"><img src={assets.instagram_logo} className="w-5 h-5" alt="instagram" /></a>
            <a href="#"><img src={assets.gmail_logo} className="w-5 h-5" alt="gmail" /></a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-medium text-gray-800 uppercase">Quick Links</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#">Home</a></li>
            <li><a href="#">Browse Cars</a></li>
            <li><a href="#">List Your Car</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-medium text-gray-800 uppercase">Resources</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Insurance</a></li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-medium text-gray-800 uppercase">Contact</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>Luxury Drive</li>
            <li>Pune</li>
            <li>9552292719</li>
            <li>kalyani.ekhande09@gmail.com</li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p>© {new Date().getFullYear()} Luxury Drive. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li><a href="#">Privacy</a></li>
          <li>|</li>
          <li><a href="#">Terms</a></li>
          <li>|</li>
          <li><a href="#">Cookies</a></li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
