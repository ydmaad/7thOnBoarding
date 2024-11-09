// types/auth.ts
export interface LoginRequest {
  id: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  success: boolean;
  avatar: string;
  nickname: string;
}

export interface RegisterRequest {
  id: string;
  password: string;
  nickname: string;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
}

export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string | null;
  success: boolean;
}

export interface ProfileUpdateResponse {
  avatar: string;
  nickname: string;
  message: string;
  success: boolean;
}
