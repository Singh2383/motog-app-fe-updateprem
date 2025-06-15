'use client'

import React from 'react'
import { useCardLogin } from '../../../hooks/use-card-login';

const LoginBtn = () => {
    const setShowLogin = useCardLogin(state => state.setShow);
    return (
        <button className='hover:cursor-pointer text-lg font-extralight' onClick={() => setShowLogin(true)}>Login / Register</button>
    )
}

export default LoginBtn;
