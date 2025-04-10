import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { get, post, del } from '../utils/http';
import {
  LikePageProductResponse,
  LikePageStudioResponse,
  AddLikeResponse,
  RemoveLikeRequest,
  RemoveLikeResponse,
} from './types';

/**
 * 스튜디오 좋아요 목록을 가져오는 API(찜한 스튜디오)
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @returns 페이지네이션된 스튜디오 목록
 */
export async function searchLikeStudioList(page: number = 0, size: number = 10): Promise<LikePageStudioResponse> {
  try {
    const endpoint = `${API_ENDPOINTS.likes.products}?page=${page}&size=${size}`;
    return await get<LikePageStudioResponse>(endpoint);
  } catch (error) {
    console.error('[MY 찜] 찜한 스튜디오 목록 가져오기 실패 searchLikeStudioList : ', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 좋아요 추가 API
 * @param targetId 좋아요 대상 ID (상품 ID)
 * @returns API 응답
 */
export async function addProductLike(targetId: number): Promise<AddLikeResponse> {
  try {
    const endpoint = API_ENDPOINTS.likes.products;
    return await post<AddLikeResponse>(endpoint, { targetId });
  } catch (error) {
    console.error('좋아요 추가 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 좋아요 삭제 API
 * @param likeId 좋아요 ID
 * @param productId 상품 ID
 */
export async function removeProductLike({ likeId, productId }: RemoveLikeRequest) {
  try {
    const endpoint = API_ENDPOINTS.likes.products;
    return await del(endpoint, { likeId, productId });
  } catch (error) {
    console.error('좋아요 삭제 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 옵션 좋아요 목록을 가져오는 API(찜한 상품)
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @returns 페이지네이션된 상품 목록
 */
export async function searchLikeOptionList(page: number = 0, size: number = 10): Promise<LikePageProductResponse> {
  try {
    const endpoint = `${API_ENDPOINTS.likes.options}?page=${page}&size=${size}`;
    return await get<LikePageProductResponse>(endpoint);
  } catch (error) {
    console.error('[MY 찜] 찜한 상품 목록 가져오기 실패 searchLikeOptionList : ', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 옵션 좋아요 추가 API
 * @param targetId 좋아요 대상 ID (상품 옵션 ID)
 * @returns API 응답
 */
export async function addOptionLike(targetId: number): Promise<RemoveLikeResponse> {
  try {
    const endpoint = API_ENDPOINTS.likes.options;
    return await post<RemoveLikeResponse>(endpoint, { targetId });
  } catch (error) {
    console.error('상품 옵션 좋아요 추가 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 옵션 좋아요 삭제 API
 * @param likeId 좋아요 ID
 * @param optionId 상품 옵션 ID
 */
export async function removeOptionLike({ likeId, optionId }: { likeId: number; optionId: number }) {
  try {
    const endpoint = API_ENDPOINTS.likes.options;
    return await del(endpoint, { likeId, productOptionId: optionId });
  } catch (error) {
    console.error('상품 옵션 좋아요 삭제 실패:', error);
    throw handleApiError(error);
  }
}
