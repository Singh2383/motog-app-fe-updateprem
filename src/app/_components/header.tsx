import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { cn } from '@/lib/utils';
import LoginBtn from './login-btn';

const Header = () => {

  return (
    <div className='w-full fixed top-0 border-b shadow-lg'>
      <div className='border-b w-full'>
        <div className='flex justify-between items-center w-10/12 ml-auto mr-auto py-4'>
          <h3 className='font-light text-4xl hover:cursor-pointer'>MotoG</h3>
          <label className={cn("flex border rounded-3xl focus-within:rounded-t-3xl focus-within:rounded-b-none w-1/2 group relative py-1", "")}>
            <IoIosSearch className='text-4xl text-neutral-700 w-16' />
            <input className='w-full outline-0' />
            <div className='group-focus-within:flex absolute top-[100%] flex-col hidden w-full border bg-white shadow-xl'>
              <h6>Recent Searches</h6>
              <div>
                <p>Search 1</p>
                <p>search 2</p>
              </div>
            </div>
          </label>
          <LoginBtn />
        </div>

      </div>
      <div>Nav Bar</div>
    </div>

  )
}

export default Header;