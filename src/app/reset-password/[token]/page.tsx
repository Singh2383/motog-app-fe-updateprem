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
import Image from 'next/image';
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from 'sonner';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { postWithoutAuth } from '@/lib/post-without-auth';

const PasswordReset: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const path = usePathname();
    const { token } = useParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            const response = await postWithoutAuth("/reset-password", {
                token,
                new_password: password,
            });

            if (response.status === 200) {
                toast.success("Password reset successful.");
                router.replace("/");
            } else {
                toast.error("Reset failed. Please try again.");
            }
        } catch (err) {
            console.error("Network error during password reset:", err);
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
            <div className='w-full max-w-3xl flex flex-col sm:flex-row fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                <div className='hidden sm:block flex-1 relative bg-white rounded-l-3xl'>
                    <Image
                        src={'/images/_reg_img.png'}
                        fill
                        alt='login image'
                        className='object-cover object-bottom rounded-l-xl shadow-lg'
                    />
                </div>
                <Card
                    id='login'
                    className="w-full max-w-sm ml-auto mr-auto sm:mr-0 outline-none border-none shadow-none relative rounded-r-xl rounded-l-xl sm:rounded-l-none"
                >
                    <IoCloseCircleOutline
                        className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800"
                        onClick={() => router.replace("/")}
                    />
                    <CardHeader>
                        <CardTitle>Password Reset</CardTitle>
                        <CardDescription className='hidden sm:block'>
                            Enter your new password below
                        </CardDescription>
                        <CardAction>
                            <Button variant="link" onClick={() => router.replace(`${path}?auth-state=login`)}>
                                Login
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="reg-password">Password</Label>
                                    <Input
                                        id="reg-password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="reg-confirm-password">Confirm Password</Label>
                                    <Input
                                        id="reg-confirm-password"
                                        type="password"
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default PasswordReset;
