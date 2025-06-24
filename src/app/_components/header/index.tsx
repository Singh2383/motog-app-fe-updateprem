import React from 'react';
import BrandLine from './brand-line';
import Location from './location';
import ManualLocation from './manual-location';
import Navbar from './navbar';

const Header = () => {

  return (
    <div className='w-full fixed top-0 border-b shadow-md bg-white z-[99999]'>
      <BrandLine />
      <div className='flex w-full justify-center'>
        <div className='flex justify-between w-10/12 py-1.5 items-center'>
          <Navbar />
          <Location />
          <ManualLocation />
        </div>
      </div>
    </div >

  )
}

export default Header;