import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}

// ─── Axios Instance ───────────────────────────────────────────────────────────

const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor — attach auth token
  client.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor — normalize errors
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      const apiError: ApiError = {
        message: error.response?.data?.message || "Something went wrong",
        errors: error.response?.data?.errors,
        status: error.response?.status || 500,
      };

      if (apiError.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
        }
      }

      return Promise.reject(apiError);
    }
  );

  return client;
};

export const apiClient = createApiClient(
  process.env.NEXT_PUBLIC_API_URL || "/api"
);

// ─── Generic CRUD Factory ─────────────────────────────────────────────────────

export function createApiService<T, CreateDto = Partial<T>, UpdateDto = Partial<T>>(
  resource: string
) {
  return {
    getAll: async (params?: PaginationParams): Promise<ApiResponse<T[]>> => {
      const { data } = await apiClient.get<ApiResponse<T[]>>(resource, { params });
      return data;
    },

    getById: async (id: string | number): Promise<ApiResponse<T>> => {
      const { data } = await apiClient.get<ApiResponse<T>>(`${resource}/${id}`);
      return data;
    },

    create: async (payload: CreateDto): Promise<ApiResponse<T>> => {
      const { data } = await apiClient.post<ApiResponse<T>>(resource, payload);
      return data;
    },

    update: async (id: string | number, payload: UpdateDto): Promise<ApiResponse<T>> => {
      const { data } = await apiClient.put<ApiResponse<T>>(`${resource}/${id}`, payload);
      return data;
    },

    patch: async (id: string | number, payload: Partial<UpdateDto>): Promise<ApiResponse<T>> => {
      const { data } = await apiClient.patch<ApiResponse<T>>(`${resource}/${id}`, payload);
      return data;
    },

    delete: async (id: string | number): Promise<{ message: string }> => {
      const { data } = await apiClient.delete(`${resource}/${id}`);
      return data;
    },

    custom: async <R>(
      method: "get" | "post" | "put" | "patch" | "delete",
      path: string,
      config?: AxiosRequestConfig
    ): Promise<R> => {
      const { data } = await apiClient[method]<R>(`${resource}${path}`, config);
      return data;
    },
  };
}
