// api/auth.ts
import { axiosInstance } from "./instance";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  UserInfo,
  ProfileUpdateResponse,
} from "../types/auth";

export const authAPI = {
  register: (data: RegisterRequest) =>
    axiosInstance.post<RegisterResponse>("/register", data),

  login: (data: LoginRequest) =>
    axiosInstance.post<LoginResponse>("/login", data),

  // 선택적으로 만료시간을 설정할 수 있는 버전
  loginWithExpiry: (data: LoginRequest, expiresIn?: string) =>
    axiosInstance.post<LoginResponse>("/login", data, {
      params: expiresIn ? { expiresIn } : undefined,
    }),

  getUserInfo: () => axiosInstance.get<UserInfo>("/user"),

  updateProfile: (formData: FormData) =>
    axiosInstance.patch<ProfileUpdateResponse>("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
