import { ApiResponse, PagedResponse } from '../common/types';

interface AddLikeSuccess {
  likeId: number;
}

export type AddLikeResponse = ApiResponse<AddLikeSuccess>;

export interface RemoveLikeRequest {
  likeId: number;
  productId: number;
}

export type RemoveLikeResponse = ApiResponse<null>;

// MY 찜 상품 옵션 정의
export interface MainLikeProduct {
  likeId: number; // 좋아요 ID (0이면 좋아요 X, 0이외의 값이면 좋아요 O)
  productOptionId: number;
  studioName: string;
  optionName: string;
  price: number;
  thumbnailUrl: string;
  originalProvided: boolean; //원본 제공 여부
  shootingHours: number; // 촬영 시간(시)
  shootingLocationCount: number; // 촬영 장소 수(단품인 경우 1 이상)
  costumeCount: number; // 의상 수량(단품인 경우 1 이상)
  retouchedCount: number; // 보정된 사진 수(단품인 경우 1 이상)
  name: string;
}

// 좋아요 페이지 응답
export type LikePageProductResponse = ApiResponse<PagedResponse<MainLikeProduct>>;

// // 찜한 상품 옵션 검색 필터 요청 타입
// export interface LikeProductSearchFilter {
//   sortBy?: string[];
//   availableSeasons?: string[];
//   cameraTypes?: string[];
//   retouchStyles?: string[];
//   partnerShopCategories?: string[];
//   minPrice?: number;
//   maxPrice?: number;
// }
