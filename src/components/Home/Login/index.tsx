"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import ASSET from "../../../../public/assets/asset-02.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Login attempt:", { email, password });
    setIsLoading(false);
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleCreateAccount = () => {
    console.log("Create account clicked");
  };

  return (
    <div className="min-h-scree  flex items-center justify-center p-4 my-10 lg:my-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex min-h-[600px]">
          {/* Left Side - Illustration */}
          <div className="flex-1 bg-gradient-to-br from-indigo-200 to-violet-200 p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Floating Animation Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-20 w-8 h-8 bg-violet-50 rounded-full opacity-60"
            />

            <motion.div
              animate={{
                y: [0, 15, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-32 right-24 w-6 h-6 bg-indigo-600 rounded-full opacity-50"
            />
            {/* <motion.div
              animate={{
                rotate: 360,
                scaleX: [1, 1.02, 1.03, 1.01, 1],
                scaleY: [1, 1.05, 1.03, 1.02, 1],
                borderRadius: ["50%", "52%", "49%", "50%", "51%"],
                opacity: [0.4, 0.8, 1, 0.8, 0.4],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute bottom-32 left-16 w-8 h-8 border-2 border-brandLight rounded-full"
            /> */}

            {/* Main Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 flex items-center justify-center border border-white/10 rounded-large"
            >
              <img
                src={ASSET.src}
                alt="Student studying with academic elements"
                className="max-w-full h-auto object-contain border-white/10 rounded-large"
              />
            </motion.div>

            {/* Bottom Text */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3"
            >
              <h2 className="text-3xl font-bold text-brandLight dark:bran text-center drop-shadow-lg">Panda Parse</h2>
              <p className="text-gray-600 text-medium leading-relaxed text-center drop-shadow-md">
                Clear pricing, save operation time and reduced cost
              </p>
            </motion.div> */}
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md mx-auto w-full"
            >
              {/* Logo */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center justify-center space-x-2 mb-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">
                    Panda <span className="text-brandLight">Parse</span>
                  </span>
                </motion.div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-600 mb-2">Username or email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-800"
                    placeholder="johnsmith007"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-800"
                    placeholder="••••••••••••"
                  />
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors duration-200"
                    >
                      Forgot password?
                    </button>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-70"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Sign in"
                  )}
                </motion.button>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="relative my-6"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </motion.div>

                {/* Google Sign In */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </motion.button>

                {/* Create Account Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="text-center pt-4"
                >
                  <span className="text-gray-600">Are you new? </span>
                  <button
                    type="button"
                    onClick={handleCreateAccount}
                    className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors duration-200 underline"
                  >
                    Create an Account
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
