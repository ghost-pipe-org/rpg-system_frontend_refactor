import api from "../api";
import type { User } from "../userServices/user.types";
import { AxiosError } from "axios";
import type { LoginCredentials, AuthResponse } from "./auth.types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post("/users/authenticate", credentials);
      return response.data;
    } catch (error: unknown) {
      console.error("Erro no login:", error);

      if (error instanceof AxiosError) {
        if (error.code === "ERR_NETWORK" || error.message?.includes("CORS")) {
          throw new Error(
            "Erro de conexão: Verifique se o servidor backend está rodando em http://localhost:3001"
          );
        }

        if (error.response?.status === 401) {
          throw new Error("Email ou senha incorretos");
        }

        if (error.response?.status === 404) {
          throw new Error(
            "Endpoint não encontrado: Verifique se a API está configurada corretamente"
          );
        }

        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Erro ao fazer login";
        throw new Error(errorMessage);
      }

      throw new Error("Erro desconhecido ao fazer login");
    }
  },

  logout: () => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
    delete api.defaults.headers.common["Authorization"];
  },

  setAuthToken: (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("@Auth:user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem("@Auth:token");
  },
};
