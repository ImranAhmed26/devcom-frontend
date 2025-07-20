"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authApi, { type LoginRequest } from "@/lib/api/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

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

      // Invalidate any cached user data
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });

      // Redirect to dashboard
      router.push("/dashboard");
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
