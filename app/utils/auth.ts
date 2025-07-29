import { setStorage } from './localStorage';

/**
 * 토큰 만료 시 사용자 정보 초기화 함수
 * 403 에러나 토큰 만료 시 호출
 */
export const clearUserData = (): void => {
  // localStorage 정리
  localStorage.removeItem('accessToken');
  localStorage.removeItem('isLoggedIn');

  // 쿠키 정리
  if (typeof document !== 'undefined') {
    document.cookie = 'accessToken=; path=/; max-age=0; secure; samesite=strict';
  }

  // 세션 스토리지 정리
  sessionStorage.clear();

  console.log('사용자 데이터가 초기화되었습니다. 다시 로그인해주세요.');
};

/**
 * 토큰 저장 함수 (로그인 시 사용)
 * localStorage와 쿠키에 동시 저장
 */
export const saveToken = (token: string): void => {
  // localStorage에 저장
  setStorage('accessToken', token);
  setStorage('isLoggedIn', 'true');

  // 쿠키에 저장
  document.cookie = `accessToken=${token}; path=/; max-age=86400; secure; samesite=strict`;
};
