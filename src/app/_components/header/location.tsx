'use client';

import React from 'react';
import { GoTriangleDown } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import useDetectLocation from '@/hooks/use-detect-location';
import { toast } from 'sonner';
import useManualLocation from '@/hooks/use-manual-location';

const Location = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const setShow = useManualLocation(state => state.setShow);
    const { location, permissionDenied } = useDetectLocation(apiKey ?? '');

    if (permissionDenied) {
        toast.warning("Please allow location access for better experience!");
    }
    return (
        <div className='flex space-x-1 items-center text-neutral-500 hover:cursor-pointer' onClick={() => setShow(true)}>
            <SlLocationPin className='text-lg font-extrabold' />
            <span className=''>{location.city}</span>
            <GoTriangleDown />
        </div>
    )
}

export default Location;
