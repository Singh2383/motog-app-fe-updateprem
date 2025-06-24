import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BrandLine from './brand-line';
import Location from './location';
import ManualLocation from './manual-location';

const Header = () => {

  return (
    <div className='w-full fixed top-0 border-b shadow-md bg-white z-[99999]'>
      <BrandLine />
      <div className='flex w-full justify-center'>
        <nav className='flex justify-between w-10/12 py-1.5 items-center'>
          <div>
            <Button variant={'link'} className='pl-0 !no-underline' asChild><Link href={"/about-us"} className=''>ABOUT US</Link></Button>
            <Button variant={'link'} className='!no-underline' asChild><Link href={"/sell"}>SELL CAR</Link></Button>
            <Button variant={'link'} className='!no-underline' asChild><Link href={"/tips-n-advice"}>TIPS & ADVICES</Link></Button>
          </div>
          <Location />
          <ManualLocation />
        </nav>
      </div>
    </div >

  )
}

export default Header;