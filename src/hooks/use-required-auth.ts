// hooks/useRequireAuth.ts
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/app/stores/auth-store';
import { useLoginPopup } from './use-login-popup';

export function useRequireAuth() {
    const { token } = useAuthStore();
    const setShow = useLoginPopup(state => state.setShow);

    useEffect(() => {
        if (!token) {
            setShow(true);
        }
    }, [token]);
}
