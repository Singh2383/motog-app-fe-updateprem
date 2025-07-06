'use client'

import React from 'react';
import { VscAccount } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";
import { useAuthStore } from '../../../components/stores/auth-store';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

const LoginBtn = () => {
    const router = useRouter();
    const path = usePathname();
    const token = useAuthStore(state => state.token);
    const setToken = useAuthStore(state => state.setToken);

    if (token) {
        return (
            <Button variant={'ghost'} className='hover:cursor-pointer flex items-center space-x-2' onClick={() => setToken()}>
                <IoMdLogOut className='text-lg' />
                Logout
            </Button>
        )
    }

    return (
        <Button variant={'ghost'} className=' hover:cursor-pointer flex items-center space-x-2' onClick={() => router.replace(`${path}?auth-state=login`)}>
            <VscAccount className='text-lg' />
            Login / Register
        </Button>
    )
}

export default LoginBtn;
