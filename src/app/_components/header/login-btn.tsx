'use client'

import React from 'react'
import { useLoginPopup } from '@/hooks/use-login-popup';
import { VscAccount } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from '@/hooks/use-auth';

const LoginBtn = () => {
    const setShowLogin = useLoginPopup(state => state.setShow);
    const token = useAuth(state => state.token);
    const setToken = useAuth(state => state.setToken);

    if (token) {
        return (
            <button className='hover:cursor-pointer flex items-center space-x-2' onClick={() => setToken("")}>
                <IoMdLogOut className='text-lg' />
                <span className='text-sm'>Logout</span>
            </button>
        )
    }

    return (
        <button className='hover:cursor-pointer flex items-center space-x-2' onClick={() => setShowLogin(true)}>
            <VscAccount className='text-lg' />
            <span className='text-sm'>Login / Register</span>
        </button>
    )
}

export default LoginBtn;
