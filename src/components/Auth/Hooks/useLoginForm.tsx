"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(3, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm(onSubmitAction: (data: LoginFormValues) => Promise<void>) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmitAction(data);
  });

  return { ...form, handleSubmit };
}
