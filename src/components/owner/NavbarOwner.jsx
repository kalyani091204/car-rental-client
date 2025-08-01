import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
  const {user} = useAppContext()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='h-7' />
      </Link>
      <p>Welcome, {user?.name || 'Owner'}</p>
    </div>
  );
};

export default NavbarOwner;
