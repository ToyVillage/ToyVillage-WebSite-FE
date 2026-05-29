import { QueryClient, defaultShouldDehydrateQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * QueryClient의 기본 설정을 정의하는 함수
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR 성능과 사용자 경험을 위한 최적화 설정
        staleTime: 1000 * 60,      // 1분간 fresh 유지 (즉시 refetch 방지)
        gcTime: 1000 * 60 * 5,     // 캐시 보관 5분
        retry: 1,                  // 실패 시 1회만 재시도
        
        // 에러 핸들링: 500번대 서버 에러만 전역 ErrorBoundary로 던짐
        throwOnError: (error) => {
          if (error instanceof AxiosError) {
            const status = error.response?.status ?? 0;
            return status >= 500;
          }
          return false;
        },
      },
      mutations: {
        throwOnError: false,
      },
      dehydrate: {
        // 서버에서 클라이언트로 데이터를 넘길 때(Dehydration), 
        // 펜딩 상태의 쿼리도 포함하도록 설정 (SSR 최적화)
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // 서버 환경일 때: 항상 새로운 QueryClient를 생성합니다.
  // (여러 사용자의 요청이 섞이지 않도록 하기 위함)
  if (typeof window === "undefined") {
    return createQueryClient();
  } 
  
  // 클라이언트(브라우저) 환경일 때: 
  // 한 번 만든 QueryClient를 계속 재사용합니다.
  else {
    if (!browserQueryClient) {
      browserQueryClient = createQueryClient();
    }
    return browserQueryClient;
  }
}