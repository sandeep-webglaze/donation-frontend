import { createApiService, apiClient } from "./client";
import type { User, Stats } from "@/types";

// Users API
export const usersApi = createApiService<User>("/users");

// Stats API (custom endpoint)
export const statsApi = {
  getStats: async (): Promise<{ data: Stats }> => {
    const { data } = await apiClient.get<{ data: Stats }>("/stats");
    return data;
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post("/auth/login", { email, password });
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.post("/auth/logout");
    return data;
  },
  me: async () => {
    const { data } = await apiClient.get("/auth/me");
    return data;
  },
};
