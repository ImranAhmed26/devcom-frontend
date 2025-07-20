"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/lib/hooks/useAuth";
import type { RegisterRequest } from "@/lib/api/auth";

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
  const registerMutation = useRegister();

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
    console.log("🔥 Form submitted with data:", data);

    // Transform form data to API request format
    const registerData: RegisterRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
      companyName: data.companyName || undefined,
    };

    console.log("🔥 Transformed register data:", registerData);
    console.log("🔥 Register mutation object:", registerMutation);

    try {
      console.log("🔥 Calling registerMutation.mutateAsync...");
      const result = await registerMutation.mutateAsync(registerData);
      console.log("🔥 Registration result:", result);
      // Success is handled in the useRegister hook
    } catch (error) {
      // Error handling is done in the useRegister hook
      // But we can add form-specific error handling here if needed
      console.error("🔥 Registration form error:", error);
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
