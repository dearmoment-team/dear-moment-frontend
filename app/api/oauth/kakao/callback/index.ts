// 로그인 관련 API 함수 정의

import { post } from '@/api/utils/http';

/**
 * 카카오 로그인 API
 * @param page 카카오에서 받는 인가코드
 * @return
 */
export async function fetchLogin(code: string) {
  try {
    const endpoint = `kauth.kakao.com/oauth/token`;

    const response: any = await post(endpoint, code);
    console.log('response', response);
    const authHeader = response.headers.get('authoriztion');
    console.log('authHeader', authHeader);

    return;
  } catch (error) {
    console.error('카카오 로그인 실패 :', error);
  }
}
