import type { User } from "../userServices/user.types";

export interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface AuthResponse {
    token: string;
    user: User;
  }