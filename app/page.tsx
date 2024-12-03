"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password is required.");
      setLoading(false);
      return;
    }
    if (userInput !== captcha) {
      setError("CAPTCHA does not match. Please try again.");
      setCaptcha(generateCaptcha());
      setUserInput("");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Notification of Residence for Foreigners
        </h1>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md placeholder-gray-400 text-gray-900"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md placeholder-gray-400 text-gray-900"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Please enter the Captcha</label>
            <div className="flex items-center space-x-2">
              <span className="bg-green-200 text-green-800 px-2 py-1 rounded-md font-mono">{captcha}</span>
              <button
                type="button"
                onClick={() => setCaptcha(generateCaptcha())}
                className="text-blue-600 underline text-sm"
              >
                Refresh
              </button>
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 border rounded-md placeholder-gray-400 text-gray-900 mt-2"
              placeholder="Type the captcha here"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <a href="/register" className="underline">
            Register
          </a>
          <a href="/forgot-password" className="underline">
            Forgot Password?
          </a>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2024 Project. All rights reserved. Project version 2024.00.01 build by Paramet.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;