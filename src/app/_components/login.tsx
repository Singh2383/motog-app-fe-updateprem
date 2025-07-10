'use client';

import React, { Suspense, useState } from 'react';
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
import { useAuthStore } from '../../components/stores/auth-store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LoginContent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();

  const setToken = useAuthStore(state => state.setToken);
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!sp.get("auth-state") || sp.get("auth-state") !== "login") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data);
        toast.success("Login successful");
        router.replace(path);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error('Login failed. Please check your credentials!');
      }
    } catch (err) {
      console.error('Network error during login:', err);
      toast.error('Network error. Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex justify-center items-center">
          <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
        <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
          <div className='flex flex-col sm:flex-row w-full shadow-lg rounded-xl'>
            <div className='rounded-l-xl overflow-hidden hidden sm:block bg-white'>
              <Image src={'/images/login_img.png'} width={500} height={500} alt='login image' />
            </div>
            <Card id='login' className="w-full max-w-sm ml-auto mr-auto sm:mr-0 outline-none border-none shadow-none relative rounded-r-xl rounded-l-xl sm:rounded-l-none">
              <IoCloseCircleOutline className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={() => router.replace(path)} />
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription className='hidden sm:block'>
                  Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                  <Button variant="link" onClick={() => router.replace(`${path}?auth-state=signup`)}>Sign Up</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button variant="link" onClick={() => router.replace(`${path}?auth-state=forgot-password`)} disabled={loading}>
                  Forgot Password
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

const Login = () => {
  return (
    <Suspense fallback={<div className='min-h-screen flex justify-center items-center'><span>Loading...</span></div>}>
      <LoginContent />
    </Suspense>
  );
};

export default Login;

