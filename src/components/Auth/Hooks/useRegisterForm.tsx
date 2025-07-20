"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authApi, { type RegisterRequest } from "@/lib/api/auth";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    companyName: z
      .string()
      .trim()
      .transform((val) => (val === "" ? undefined : val))
      .optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Direct registration mutation - simple and straightforward
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      console.log("🔥 Register mutation: Starting registration with data:", data);
      try {
        const result = await authApi.register(data);
        console.log("🔥 Register mutation: API call successful:", result);
        return result;
      } catch (error) {
        console.error("🔥 Register mutation: API call failed:", error);
        throw error;
      }
    },
    onSuccess: (response) => {
      console.log("✅ Registration successful:", response.data.user);

      // Invalidate any cached user data
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("❌ Registration failed:", error);
    },
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("🔥 Register form submitted with data:", data);

    // Transform form data to API request format
    const registerData: RegisterRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
      companyName: data.companyName || undefined,
    };

    console.log("🔥 Calling register mutation...");
    try {
      await registerMutation.mutateAsync(registerData);
    } catch (error) {
      console.error("🔥 Register form error:", error);
    }
  });

  return {
    ...form,
    handleSubmit,
    isSubmitting: registerMutation.isPending,
    error: registerMutation.error,
    isSuccess: registerMutation.isSuccess,
  };
}
