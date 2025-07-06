"use client";

import { fetchWithOutAuth } from '@/lib/fetch-without-auth';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { token } = useParams();

    useEffect(() => {
        fetchWithOutAuth(`verify-email?token=${token}`)
            .then(res => {
                setLoading(false);
                if (res.status == 200) {
                    toast.success("Email verification succeeded");
                    setTimeout(() => {
                        router.replace("/");
                    }, 200);
                }
            }).catch(err => {
                setLoading(false);
                toast.error("Something Went Wrong!");
                console.log("failed email verification:", err);
            })
    })

    return (
        <div className="min-h-screen flex justify-center items-center">
            {loading && <p>Please wait for a moment...</p>}
        </div>
    )
}

export default VerifyEmail;