// frontend/src/app/login/page.tsx
'use client'; // This directive makes this a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

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
        setSuccess("Login successful! Redirecting...");
        console.log('Login successful:', data);
        // Redirect to home page or dashboard
        setTimeout(() => {
          router.push('/'); // Redirect to the homepage
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed. Please check your credentials.');
        console.error('Login failed:', errorData);
      }
    } catch (err) {
      console.error('Network error during login:', err);
      setError('Network error. Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-blue-500 hover:text-blue-800 font-bold"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;