// queries/auth.ts
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "../api/auth";
import { LoginRequest, RegisterRequest } from "../types/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authAPI.register(data),
    onSuccess: (response) => {
      // 성공 시 처리 (예: 로그인 페이지로 이동)
      console.log("회원가입 성공:", response);
    },
    onError: (error) => {
      // 에러 처리
      console.error("회원가입 실패:", error);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.login(data),
    onSuccess: (response) => {
      // response.data에서 토큰을 가져와서 저장
      console.log("Login response:", response.data); // 응답 확인
      localStorage.setItem("accessToken", response.data.accessToken);
    },
  });
};
