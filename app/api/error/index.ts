// API 에러 처리 중앙화

import { ApiError } from '../common/types';

/**
 * API 에러 클래스
 */
export class ApiErrorImpl extends Error implements ApiError {
  code: string;
  details?: Record<string, unknown>;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

/**
 * HTTP 상태 코드에 따른 에러 코드 매핑
 */
export const HTTP_ERROR_CODES: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'VALIDATION_ERROR',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_SERVER_ERROR',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT',
};

/**
 * HTTP 응답에서 에러 메시지 추출
 * @param response Fetch API 응답 객체
 * @returns 에러 메시지
 */
export async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data.message || data.error || `${response.status} ${response.statusText}`;
  } catch (e) {
    return `${response.status} ${response.statusText} ${e}`;
  }
}

/**
 * HTTP 에러 처리 함수
 * @param response Fetch API 응답 객체
 * @param onUnauthorized 인증 실패 시 콜백
 * @param onForbidden 권한 부족 시 콜백
 */
export async function handleHttpError(
  response: Response,
  onUnauthorized?: () => void,
  onForbidden?: () => void
): Promise<never> {
  const statusCode = response.status;
  const message = await extractErrorMessage(response);
  const code = HTTP_ERROR_CODES[statusCode] || 'UNKNOWN_ERROR';

  const apiError = new ApiErrorImpl(message, code, {
    status: statusCode,
    statusText: response.statusText,
  });

  // 인증 관련 에러는 handleAuthError로 처리
  if (statusCode === 401 || statusCode === 403) {
    await handleAuthError(apiError, onUnauthorized, onForbidden);
  }

  throw apiError;
}

/**
 * 일반 에러를 API 에러로 변환
 * @param error 원본 에러
 * @returns API 에러
 */
export function handleApiError(error: unknown): ApiErrorImpl {
  if (error instanceof ApiErrorImpl) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiErrorImpl(error.message);
  }

  return new ApiErrorImpl('알 수 없는 에러가 발생했습니다.');
}

/**
 * 인증 관련 에러 처리 (401, 403)
 * @param error API 에러
 * @param onUnauthorized 인증 실패 시 콜백
 * @param onForbidden 권한 부족 시 콜백
 */
export async function handleAuthError(
  error: unknown,
  onUnauthorized?: () => void,
  onForbidden?: () => void
): Promise<void> {
  const apiError = handleApiError(error);

  if (apiError.code === 'UNAUTHORIZED' || apiError.code === 'FORBIDDEN') {
    // 사용자 데이터 초기화
    if (typeof window !== 'undefined') {
      const { clearUserData } = await import('@/utils/auth');
      clearUserData();
    }

    if (apiError.code === 'UNAUTHORIZED') {
      alert('로그인이 필요합니다. 다시 로그인해주세요.');
      onUnauthorized?.();
    } else {
      alert('이 상품에 대한 문의 권한이 없습니다. 관리자에게 문의해주세요.');
      onForbidden?.();
    }
  } else {
    // 기타 에러
    alert('요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
}

/**
 * 문의 관련 에러 처리
 * @param error API 에러
 * @param onClose 모달/시트 닫기 콜백
 */
export async function handleInquiryError(error: unknown, onClose?: () => void): Promise<void> {
  const apiError = handleApiError(error);

  if (apiError.code === 'UNAUTHORIZED' || apiError.code === 'FORBIDDEN') {
    await handleAuthError(error, onClose, onClose);
  } else {
    alert('문의 등록에 실패했습니다. 다시 시도해주세요.');
  }
}

/**
 * 좋아요 관련 에러 처리
 * @param error API 에러
 */
export async function handleLikeError(error: unknown): Promise<void> {
  const apiError = handleApiError(error);

  if (apiError.code === 'UNAUTHORIZED' || apiError.code === 'FORBIDDEN') {
    await handleAuthError(error);
  } else {
    alert('좋아요 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
}
