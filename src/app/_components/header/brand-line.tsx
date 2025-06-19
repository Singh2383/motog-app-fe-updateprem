import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
import { IoIosSearch } from 'react-icons/io';
import LoginBtn from './login-btn';

const popularSearches = ["All Popular Cars", "Toyota Hilux", "Tata Harrier", "Mahindra Bolero"];

const BrandLine = () => {
    return (
        <div className='border-b w-full'>
            <div className='flex justify-between items-center w-10/12 ml-auto mr-auto py-2'>
                <Link href={"/"} className='w-2/12 max-w-40'><img src={"/images/brand_logo.svg"} className='overflow-hidden' /></Link>
                <label className={cn("flex border rounded-3xl focus-within:rounded-t-3xl focus-within:rounded-b-none w-1/2 group relative py-0.5")}>
                    <IoIosSearch className='text-4xl text-neutral-700 w-16' />
                    <input className='w-full outline-0' />
                    <div className='group-focus-within:flex absolute top-[100%] flex-col hidden w-full border bg-white shadow-xl rounded-bl-3xl py-2 overflow-hidden'>
                        <h6 className='shadow-2xs py-2 px-4 text-sm text-neutral-600 '>POPULAR SEARCHES</h6>
                        <div className=''>
                            {popularSearches.map((ps, i) => (<p key={`${i}-${ps.split(" ").join("_")}`} className={cn('hover:bg-neutral-200 py-1 px-4')}>{ps}</p>))}
                        </div>
                    </div>
                </label>
                <LoginBtn />
            </div>
        </div>
    )
}

export default BrandLine;
