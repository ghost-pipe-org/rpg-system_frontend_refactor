import type { User } from "../userServices/user.types";

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    enrollment?: string;
    phoneNumber?: string;
    masterConfirm: boolean;
  }