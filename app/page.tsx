// app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-gray-200 rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-bold mb-4 text-gray-800">
          Notification of Residence for Foreigners
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* CAPTCHA Section */}
          <div>
            <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
              Please enter the Captcha
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-24 h-10 bg-green-200 text-gray-800 font-bold">
                CAPTCHA
              </div>
              <input
                type="text"
                id="captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                required
              />
              <button type="button" className="p-2 text-gray-500">
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 font-bold text-white bg-blue-700 rounded-md hover:bg-blue-800"
          >
            Login
          </button>
        </form>

        {/* Links and Footer */}
        <div className="mt-4 text-sm text-center">
          <a href="#" className="text-blue-500 hover:underline">Register</a> |
          <a href="#" className="text-blue-500 hover:underline ml-2">Forgot Password?</a>
          <div className="mt-2">
            <a href="#" className="text-blue-500 hover:underline">Download Example File</a> |
            <a href="#" className="text-blue-500 hover:underline ml-2">User's Guide</a>
          </div>
          <p className="mt-4 text-xs text-gray-600">
            © 2023 Project. All rights reserved.<br />
            Project version 2024.10.00 build 0303
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;