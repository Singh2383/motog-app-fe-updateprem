'use client';

import { useAuthStore } from '@/app/stores/auth-store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/', "/inventory", "/sell", "/about-us", "/contact-us", "/faqs", "/privacy-policy", "/refund-policy",
    "/terms-of-use",
    "/tips-n-advices"
];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { token } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!token?.access_token && !PUBLIC_ROUTES.includes(pathname)) {
            router.push('/login');
        }
    }, [, pathname]);

    return <>{children}</>;
}
