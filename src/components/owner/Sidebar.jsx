import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast'; // ✅ Required toast import

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState('');

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const { data } = await axios.post('/api/owner/update-image', formData);

      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen w-full md:w-60 border-r border-borderColor flex flex-col items-center py-8 bg-white text-sm'>
      {/* Profile Image Upload */}
      <div className='relative group'>
        <label htmlFor='image' className='relative cursor-pointer block w-24 h-24 rounded-full overflow-hidden'>
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300'
            }
            alt='profile'
            className='w-full h-full object-cover border border-gray-300'
          />
          <input
            type='file'
            id='image'
            accept='image/*'
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className='absolute inset-0 bg-black/10 hidden group-hover:flex items-center justify-center'>
            <img src={assets.edit_icon} alt='edit' className='w-6 h-6' />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          className='mt-2 flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded text-xs'
           onClick={updateImage} >
          Save
          <img src={assets.check_icon} width={13} alt='check' />
        </button>
      )}

      {/* User Name */}
      <p className='mt-4 font-medium text-base'>{user?.name}</p>

      {/* Navigation Links */}
      <div className='w-full mt-6'>
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-3 w-full py-3 pl-6 transition-all hover:bg-gray-50 ${
              link.path === location.pathname
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-gray-600'
            }`}
          >
            <img
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt='icon'
              className='w-5 h-5'
            />
            <span>{link.name}</span>

            {link.path === location.pathname && (
              <div className='bg-primary w-1.5 h-8 rounded-l absolute right-0'></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
