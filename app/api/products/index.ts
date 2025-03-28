// 상품 관련 API 함수 정의

import { Product, MainPageProductsResponse } from './types';
import { get } from '../utils/http';
import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';

/**
 * 메인 페이지 상품 목록을 가져오는 API
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @returns 페이지네이션된 상품 목록
 */
export async function fetchMainPageProducts(page: number = 0, size: number = 10): Promise<MainPageProductsResponse> {
  try {
    const endpoint = `${API_ENDPOINTS.products.main}?page=${page}&size=${size}`;
    return await get<MainPageProductsResponse>(endpoint);
  } catch (error) {
    console.error('메인 페이지 상품 목록 가져오기 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 상세 정보를 가져오는 API
 * @param id 상품 ID
 * @returns 상품 상세 정보
 */
export async function fetchProductDetail(id: number): Promise<Product> {
  try {
    const endpoint = API_ENDPOINTS.products.detail(id);
    return await get<Product>(endpoint);
  } catch (error) {
    console.error('상품 상세 데이터 가져오기 실패:', error);
    throw handleApiError(error);
  }
}
