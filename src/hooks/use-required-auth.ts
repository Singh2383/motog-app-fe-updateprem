'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/components/stores/auth-store';
import { usePathname, useRouter } from 'next/navigation';

export function useRequireAuth() {
    const { token } = useAuthStore();
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!token) {
            console.log("token in require auth", token);
            router.replace(`${path}?auth-state=login`);
        }
    }, [token]);
}
