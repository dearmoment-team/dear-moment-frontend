// API 설정 중앙화

/**
 * API 기본 설정
 */
export const API_CONFIG = {
  // API 기본 URL
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dearmoment.o-r.kr',

  // API 경로 접두사 (프록시 사용 시)
  pathPrefix: '/api',

  // 요청 타임아웃 (ms)
  timeout: 30000,

  // 기본 헤더
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  // 재시도 설정
  retry: {
    maxRetries: 3,
    retryDelay: 1000, // ms
  },
};

/**
 * API 엔드포인트 정의
 */
export const API_ENDPOINTS = {
  products: {
    main: '/products/main',
    detail: (id: number) => `/products/${id}`,
  },
  // 추후 다른 도메인 엔드포인트 추가
};

/**
 * API URL 생성 함수
 * @param endpoint API 엔드포인트
 * @returns 전체 API URL
 */
export function createApiUrl(endpoint: string): string {
  return `${API_CONFIG.pathPrefix}${endpoint}`;
}
