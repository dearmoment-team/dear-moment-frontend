import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { post } from '../utils/http';
import { AddLikeResponse } from './types';

/**
 * 좋아요 추가 API
 * @param targetId 좋아요 대상 ID (상품 ID)
 * @returns API 응답
 */
export async function addLike(targetId: number): Promise<AddLikeResponse> {
  try {
    const endpoint = API_ENDPOINTS.likes;
    return await post<AddLikeResponse>(endpoint, { targetId });
  } catch (error) {
    console.error('좋아요 추가 실패:', error);
    throw handleApiError(error);
  }
}
