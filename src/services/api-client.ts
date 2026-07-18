import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { TokenService } from "./token.service";
import { AuthResponse } from "@/types/api";

// Origem pura do backend (SEM /api/v1). Prod: https://api.miucontrole.com.br
// A mesma env é usada como origem pelo socket.io (SocketContext) e pelas imagens
// (lib/utils.getFullImageUrl), por isso o prefixo /api/v1 é anexado SÓ aqui.
const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const API_BASE_URL = `${API_ORIGIN}/api/v1`;

// Create base instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: refresh token (401) + toasts para 429/408
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const status = error.response?.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenService.getRefreshToken();

        if (!refreshToken) {
          TokenService.clearTokens();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }

        // Call refresh endpoint directly using axios to avoid infinite loop
        const response = await axios.post<AuthResponse>(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        TokenService.setTokens(accessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        TokenService.clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    // Rate limit e timeout globais: feedback amigável (só no client).
    if (typeof window !== "undefined") {
      if (status === 429) {
        const retryAfter =
          (error.response?.data as { retryAfter?: string } | undefined)
            ?.retryAfter ?? error.response?.headers?.["retry-after"];
        toast.error(
          retryAfter
            ? `Muitas requisições. Tente novamente em ${retryAfter}.`
            : "Muitas requisições. Aguarde um instante e tente novamente."
        );
      } else if (status === 408) {
        toast.error("A requisição demorou demais. Verifique sua conexão e tente novamente.");
      }
    }

    return Promise.reject(error);
  }
);
