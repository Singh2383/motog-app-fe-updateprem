"use client";

import { useAuthStore } from '@/components/stores/auth-store';
import { fetchWithOutAuth } from '@/lib/fetch-without-auth';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { token } = useParams();
    const auth = useAuthStore();

    useEffect(() => {
        fetchWithOutAuth(`verify-email?token=${token}`)
            .then(res => {
                setLoading(false);
                if (res.status == 200) {
                    toast.success("Email verification succeeded");
                    if (auth.token?.access_token) {
                        auth.setToken({ access_token: auth.token?.access_token, token_type: auth.token?.token_type, user: res.data });
                    }
                    setTimeout(() => {
                        router.replace("/");
                    }, 200);
                }
            }).catch(err => {
                setLoading(false);
                toast.error("Something Went Wrong!");
                console.error("failed email verification:", err);
            })
    })

    return (
        <div className="min-h-screen flex justify-center items-center">
            {loading && <p>Please wait for a moment...</p>}
        </div>
    )
}

export default VerifyEmail;