'use client';

import React from 'react';
import { GoTriangleDown } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import useDetectLocation from '@/hooks/use-detect-location';
import { toast } from 'sonner';
import useManualLocation from '@/hooks/use-manual-location';
import useLocation from '@/hooks/use-location';

const Location = () => {
    const setShow = useManualLocation(state => state.setShow);
    const { permissionDenied } = useDetectLocation();
    const locality = useLocation(state => state.locality);

    if (permissionDenied) {
        toast.warning("Please allow location access for better experience.");
    }

    console.log("locality", locality);
    if (!locality?.placeId) {
        toast.warning("Please enter location manually.");
    }


    return (
        <div className='flex space-x-1 items-center text-neutral-500 hover:cursor-pointer' onClick={() => setShow(true)}>
            <SlLocationPin className='text-lg font-extrabold' />
            <span className=''>{locality?.structuredFormat.mainText.text ?? 'Select Locality'}</span>
            <GoTriangleDown />
        </div>
    )
}

export default Location;
