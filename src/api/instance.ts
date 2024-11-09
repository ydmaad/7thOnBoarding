import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 인터셉터 수정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 수정된 부분
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken"); // 토큰 삭제
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  }
);
