"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      if (response.ok) {
        setEmailVerified(true);
        setError(null); // Clear any previous error
      } else {
        setError(result.error || "Email verification failed.");
      }
    } catch (err) {
      setError("An error occurred while verifying the email.");
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Password updated successfully.");
        setTimeout(() => {
          router.push("/"); // Redirect to the home page
        }, 2000); // Wait 2 seconds before redirecting
      } else {
        setError(result.error || "Failed to update password.");
      }
    } catch (err) {
      setError("An error occurred while updating the password.");
    }
  };

  // Reset the error when the user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {emailVerified ? "Reset Password" : "Forgot Password"}
        </h1>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {successMessage && (
          <div className="mb-4 text-green-600 text-center">{successMessage}</div>
        )}

        {!emailVerified ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange} // Clear error when typing
                className="w-full p-2 border rounded-md placeholder-gray-400 text-gray-900"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              onClick={handleVerifyEmail}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Verify Email
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded-md placeholder-gray-400 text-gray-900"
                placeholder="Enter new password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded-md placeholder-gray-400 text-gray-900"
                placeholder="Confirm new password"
                required
              />
            </div>
            <button
              onClick={handleUpdatePassword}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;