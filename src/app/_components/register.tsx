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
import { useCardRegister } from '../../../hooks/use-card-register';
import { useCardLogin } from '../../../hooks/use-card-login';
import Image from 'next/image';
import { IoCloseCircleOutline } from "react-icons/io5";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const show = useCardRegister(state => state.show);
  const setShowRegister = useCardRegister(state => state.setShow);
  const setShowLogin = useCardLogin(state => state.setShow);

  const router = useRouter();
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  console.log("register component, show:", show);

  if (!show) return null;

  const login = () => {
    setShowLogin(true);
    setShowRegister(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages
    setLoading(true);

    if (!BACKEND_API_URL) {
      setError("Backend API URL is not defined in environment variables.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Registration successful! Redirecting to login...");
        console.log('Registration successful:', data);
        // Optionally, redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Registration failed. Please try again.');
        console.error('Registration failed:', errorData);
      }
    } catch (err) {
      console.error('Network error during registration:', err);
      setError('Network error. Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setShowRegister(false);
  }

  return (
    <div className='w-full max-w-3xl flex fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border shadow-lg rounded-xl '>
      <div className='bg-white'>
        <Image src={'/images/register_img.png'} width={500} height={700} alt='login image' objectFit="cover" className='rounded-l-xl border-l shadow-lg' />
      </div>
      <Card className="w-full max-w-sm ml-auto outline-none border-none shadow-none relative">
        <IoCloseCircleOutline className="absolute -top-1 -right-8 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={close} />
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={login}>Have an account?</Button>
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
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Re-enter Password</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;