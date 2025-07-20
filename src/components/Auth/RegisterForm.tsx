"use client";

import MotionFadeIn from "./MotionFadeIn";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import { useRegisterForm } from "./Hooks/useRegisterForm";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useRegisterForm(async (data) => {
    console.log("Register Attempt:", data);
    await new Promise((res) => setTimeout(res, 1000));
  });

  return (
    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
      <MotionFadeIn delay={0.3} className="max-w-md mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create your <span className="text-indigo-500">Panda Parse</span> account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput label="Full Name" placeholder="John Smith" error={errors.name} register={register("name")} />
          <AuthInput label="Email" placeholder="john@example.com" error={errors.email} register={register("email")} />
          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password}
            register={register("password")}
          />
          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword}
            register={register("confirmPassword")}
          />

          <AuthButton type="submit" isLoading={isSubmitting} delay={0.5}>
            Create Account
          </AuthButton>

          <MotionFadeIn delay={0.6} className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button type="button" className="text-indigo-500 hover:underline">
              Sign in
            </button>
          </MotionFadeIn>
        </form>
      </MotionFadeIn>
    </div>
  );
}
