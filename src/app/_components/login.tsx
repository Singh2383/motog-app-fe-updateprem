'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
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
import { useCardRegister } from '../../../hooks/use-card-register';
import { useCardLogin } from '../../../hooks/use-card-login';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const show = useCardLogin(state => state.show);
  const setShowLogin = useCardLogin(state => state.setShow);
  const setShowRegister = useCardRegister(state => state.setShow);

  const router = useRouter();
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!show) return null;

  const signUp = () => {
    setShowRegister(true);
    setShowLogin(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI expects 'username' for email in form data
    formData.append('password', password);

    try {
      // Note: FastAPI's OAuth2PasswordBearer expects x-www-form-urlencoded for login
      const response = await fetch(`${BACKEND_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the access token in localStorage (for client-side access)
        localStorage.setItem('access_token', data.access_token);
        toast.success("Login successful! Redirecting...");
        console.log('Login successful:', data);
        // Redirect to home page or dashboard
        setTimeout(() => {
          setShowLogin(false);
          router.push('/'); // Redirect to the homepage
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error('Login failed. Please check your credentials!');
      }
    } catch (err) {
      console.error('Network error during login:', err);
      toast.error('Network error. Could not connect to the server.');
    }
  };

  const close = () => {
    setShowLogin(false);
  }

  return (
    <div className='w-full max-w-3xl flex fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border shadow-lg rounded-xl'>
      <div className='hidden sm:block'>
        <Image src={'/images/login_img.png'} width={500} height={500} alt='login image' className='rounded-l-xl border-l shadow-lg' />
      </div>
      <Card id='login' className="w-full max-w-sm ml-auto outline-none border-none shadow-none relative rounded-none rounded-r-xl">
        <IoCloseCircleOutline className="absolute -top-1 -right-8 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={close} />
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className='hidden sm:block'>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={signUp}>Sign Up</Button>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
