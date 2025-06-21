'use client'

import React from 'react'
import { useCardLogin } from '@/hooks/use-card-login';
import { VscAccount } from "react-icons/vsc";

const LoginBtn = () => {
    const setShowLogin = useCardLogin(state => state.setShow);
    return (
        <button className='hover:cursor-pointer flex items-center space-x-2' onClick={() => setShowLogin(true)}>
            <VscAccount className='text-lg'/>
            <span className='text-sm'>Login / Register</span>
        </button>
    )
}

export default LoginBtn;
