'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from 'next/image';
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const sp = useSearchParams();
    const router = useRouter();
    const path = usePathname();

    const [email, setEmail] = useState<string>('');

    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    console.log("auth-state=", sp.get("auth-state"));

    if (!sp.get("auth-state") || sp.get("auth-state") !== "forgot-password") return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        axios.post(`${BACKEND_API_URL}/forgot-password`, { email })
            .then(res => {
                if (res.status !== 200) {
                    toast.error("Something went wrong! Please try again.");
                    return;
                }
                toast.info("Please check your email for password reset link.");
                close();
            }).catch(err => toast.error("Something went wrong! Please try again."));
    };

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
            <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 '>
                <div className='flex flex-col sm:flex-row w-full- shadow-lg rounded-xl'>
                    <div className='rounded-l-xl overflow-hidden hidden sm:block bg-white'>
                        <Image src={'/images/login_img.png'} width={500} height={500} alt='login image' className='' />
                    </div>
                    <Card id='login' className="w-full max-w-sm ml-auto mr-auto sm:mr-0 outline-none border-none shadow-none relative rounded-r-xl rounded-l-xl sm:rounded-l-none">
                        <IoCloseCircleOutline className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={() => router.replace(path)} />
                        <CardHeader>
                            <CardTitle>Forgot your password?</CardTitle>
                            <CardDescription className='hidden sm:block'>
                                Enter your email to reset your password
                            </CardDescription>
                            <CardAction>
                                <Button variant="link" onClick={() => router.replace(`${path}?auth-state=login`)}>Login</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full" onClick={handleSubmit}>
                                Reset Password
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
