import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user", "moderator"]),
  status: z.enum(["active", "inactive"]).optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const settingsSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const websiteSettingsSchema = z.object({
  // Identity
  siteName: z.string().min(1, "Site name is required").max(40, "Keep it under 40 characters"),
  tagline: z.string().max(80, "Keep it under 80 characters"),
  description: z.string().max(300, "Keep it under 300 characters"),
  // Appearance
  primaryColor: z.string().min(1),
  defaultTheme: z.enum(["light", "dark"]),
  // Contact
  email: z.string().email("Invalid email address").or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  address: z.string().max(120).optional().or(z.literal("")),
  // Social
  facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  // Toggles
  maintenanceMode: z.boolean(),
  showStats: z.boolean(),
});

export type UserFormValues = z.infer<typeof userSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type SettingsFormValues = z.infer<typeof settingsSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type WebsiteSettingsValues = z.infer<typeof websiteSettingsSchema>;
