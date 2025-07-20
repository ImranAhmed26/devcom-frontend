"use client";

import MotionFadeIn from "./MotionFadeIn";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import { useLoginForm } from "./Hooks/useLoginForm";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm(async (data) => {
    console.log("Login Attempt:", data);
    await new Promise((res) => setTimeout(res, 1000));
  });

  return (
    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
      <MotionFadeIn delay={0.3} className="max-w-md mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
          Welcome back to <span className="text-indigo-500">Panda Parse</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <MotionFadeIn delay={0.4}>
            <AuthInput
              label="Your Email"
              type="email"
              placeholder="johnsmith007"
              error={errors.email}
              register={register("email")}
            />
          </MotionFadeIn>

          <MotionFadeIn delay={0.5}>
            <AuthInput
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password}
              register={register("password")}
            />
            <div className="text-right mt-1">
              <button type="button" className="text-sm text-indigo-500 hover:underline">
                Forgot password?
              </button>
            </div>
          </MotionFadeIn>

          <AuthButton type="submit" isLoading={isSubmitting} delay={0.6}>
            Sign in
          </AuthButton>

          <MotionFadeIn delay={0.7} className="text-center">
            <span className="text-gray-600">New here? </span>
            <button type="button" className="text-indigo-500 hover:underline">
              Create an Account
            </button>
          </MotionFadeIn>
        </form>
      </MotionFadeIn>
    </div>
  );
}
