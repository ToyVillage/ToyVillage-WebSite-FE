import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosConfig = {
  baseURL: "http://165.232.168.1:8080",
  timeout: 10000,
};

export const userApi = axios.create(axiosConfig);

export const adminApi = axios.create(axiosConfig);

// 요청마다 쿠키에서 access_token을 꺼내 Authorization 헤더에 담음
adminApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 토큰 재발급 상태 관리 — 동시에 여러 요청이 401을 받아도 재발급은 한 번만 수행
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
};


adminApi.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // 재발급 진행 중이면 대기열에 추가
    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push((token: string) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(adminApi(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const email = localStorage.getItem("user_email");
      if (!email) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
      const { data } = await axios.post(
        `${axiosConfig.baseURL}/auth/token/refresh`,
        { email },
        { withCredentials: true } // httpOnly refreshToken 쿠키 자동 전송
      );

      const newAccessToken: string = data.access_token;
      document.cookie = `access_token=${newAccessToken}; path=/`;

      processQueue(newAccessToken);
      original.headers.Authorization = `Bearer ${newAccessToken}`;
      return adminApi(original);
    } catch (refreshError) {
      refreshQueue = [];
      const status = (refreshError as AxiosError)?.response?.status;
      // 401(토큰 무효/만료), 403(미로그인), 404(refreshToken 없음) → 로그인으로
      if (status === 401 || status === 403 || status === 404) {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("user_email");
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

userApi.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => Promise.reject(error)
);