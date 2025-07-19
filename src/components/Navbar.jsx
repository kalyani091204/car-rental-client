import React, { useState } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const {
    setShowLogin,
    user,
    logout,
    axios,
    setIsOwner,
    isOwner
  } = useAppContext(); // ✅ fixed

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role');
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate('/owner');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 
      text-gray-600 border-b border-borderColor relative transition-all 
      ${location.pathname === '/' ? 'bg-light' : 'bg-white'}`}
    >
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-4">
          {menuLinks.map((link, index) => (
            <Link key={index} to={link.path} className="hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 py-1.5 rounded-full max-w-56">
          <input
            type="text"
            className="bg-transparent outline-none w-full placeholder-gray-500"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => isOwner ? navigate('/owner') : changeRole()}
            className="cursor-pointer hover:text-primary transition-colors"
          >
            {isOwner ? 'Dashboard' : 'List Cars'}
          </button>

          <button
            onClick={() => user ? logout() : setShowLogin(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="w-6 h-6"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full right-0 w-full bg-white border-t border-borderColor flex flex-col gap-4 p-4 md:hidden z-50">
          {menuLinks.map((link, index) => (
            <Link key={index} to={link.path} onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2 border border-borderColor px-3 py-1.5 rounded-full">
            <input
              type="text"
              className="bg-transparent outline-none w-full placeholder-gray-500"
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>
          <button onClick={() => isOwner ? navigate('/owner') : changeRole()}>
            {isOwner ? 'Dashboard' : 'List Cars'}
          </button>
          <button
            onClick={() => user ? logout() : setShowLogin(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
