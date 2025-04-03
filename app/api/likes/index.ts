import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { del, post } from '../utils/http';
import { AddLikeResponse, RemoveLikeRequest, RemoveLikeResponse } from './types';

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

/**
 * 좋아요 삭제 API
 * @param param0 likeId, productId
 * @returns API 응답
 */
export async function removeLike({ likeId, productId }: RemoveLikeRequest): Promise<RemoveLikeResponse> {
  try {
    const endpoint = API_ENDPOINTS.likes;
    return await del<RemoveLikeResponse>(endpoint, { likeId, productId });
  } catch (error) {
    console.error('좋아요 삭제 실패:', error);
    throw handleApiError(error);
  }
}
