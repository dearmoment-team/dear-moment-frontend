import { ApiResponse } from '../common/types';
import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { get, patch, post } from '../utils/http';
import { patchUserReq, PostUserInfoReq, UserRes } from './types';

/**
 * 사용자 프로필 조회 API
 * @returns 사용자 정보
 */
export async function getUser(): Promise<ApiResponse<UserRes>> {
  try {
    const endpoint = `${API_ENDPOINTS.users}`;
    return await get<ApiResponse<UserRes>>(endpoint);
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 사용자 프로필 수정 API
 * @param data 사용자 정보
 * @returns 수정된 사용자 정보
 */
export async function patchUser(data: patchUserReq): Promise<ApiResponse<UserRes>> {
  try {
    const endpoint = `${API_ENDPOINTS.users}`;
    return await patch<ApiResponse<UserRes>>(endpoint, data);
  } catch (error) {
    console.error('사용자 정보 수정 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 프로필 정보 입력 & 동의/거부
 */
export async function postUserInfo(data: PostUserInfoReq): Promise<ApiResponse<UserRes>> {
  try {
    const endpoint = `${API_ENDPOINTS.users}/add-info`;
    return await post<ApiResponse<UserRes>>(endpoint, data);
  } catch (error) {
    console.error('사용자 정보 입력 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 프로필 정보 스킵 API
 * @param data 프로필 정보 스킵
 * @returns null
 */
export async function skipUserInfo(): Promise<ApiResponse<null>> {
  try {
    const endpoint = `${API_ENDPOINTS.users}/add-info/skip`;
    return await post<ApiResponse<null>>(endpoint, {});
  } catch (error) {
    console.error('프로필 정보 스킵 실패:', error);
    throw handleApiError(error);
  }
}
