'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const path = usePathname();
    return (
        <nav>
            <Button variant={'link'} className={cn('pl-0', path === "/about-us" && "underline")} asChild><Link href={"/about-us"} className=''>ABOUT US</Link></Button>
            <Button variant={'link'} className={cn('', path === "/sell" && "underline")} asChild><Link href={"/sell"}>SELL CAR</Link></Button>
            <Button variant={'link'} className={cn('', path === "/tips-n-advices" && "underline")} asChild><Link href={"/tips-n-advices"}>TIPS & ADVICES</Link></Button>
        </nav>
    )
}

export default Navbar
