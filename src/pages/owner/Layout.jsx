import React, { useEffect } from 'react';
import NavbarOwner from '../../components/owner/NavbarOwner';
import Sidebar from '../../components/owner/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const{isOwner,navigate} = useAppContext()

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }


  },[isOwner])
  return (
    <div className='flex flex-col min-h-screen bg-[#f9f9f9]'>
      {/* Top Navbar */}
      <NavbarOwner />

      {/* Main Content Area */}
      <div className='flex flex-1'>
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content Area */}
        <div className='flex-1 p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
