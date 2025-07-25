"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import authApi, { type LoginRequest } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/auth/authStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const { login } = useAuthStore();

  // Direct login mutation - simple and straightforward
  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      console.log("🔥 Login mutation: Starting login with data:", data);
      try {
        const result = await authApi.login(data);
        console.log("🔥 Login mutation: API call successful:", result);
        return result;
      } catch (error) {
        console.error("🔥 Login mutation: API call failed:", error);
        throw error;
      }
    },
    onSuccess: (response) => {
      console.log("✅ Login successful:", response.data.user);
      console.log("🔍 [Login] Full API response:", response);
      console.log("🔍 [Login] Response data:", response.data);
      console.log("🔍 [Login] Token from response:", response.data.access_token);
      console.log("🔍 [Login] RefreshToken from response:", response.data.refresh_token);

      // Use auth context to handle login
      login(
        {
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        },
        {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          companyName: response.data.user.companyName,
        }
      );
    },
    onError: (error: any) => {
      console.error("❌ Login failed:", error);
    },
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("🔥 Login form submitted with data:", data);

    // Transform form data to API request format
    const loginData: LoginRequest = {
      email: data.email,
      password: data.password,
    };

    console.log("🔥 Calling login mutation...");
    try {
      await loginMutation.mutateAsync(loginData);
    } catch (error) {
      console.error("🔥 Login form error:", error);
    }
  });

  return {
    ...form,
    handleSubmit,
    isSubmitting: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
  };
}
