import { CameraType, FilterType, FilterValue, PackageType, PriceRange, RetouchStyle, ShootingPeriod, SortOption } from '../type';

// 필터링 관련 상수와 타입 정의
// 가격 범위 매핑 상수
export const PRICE_RANGE_MAP: Record<string, PriceRange> = {
  '30만원 이하': { min: 0, max: 30 },
  '31-49만원': { min: 31, max: 49 },
  '50-69만원': { min: 50, max: 69 },
  '70만원 이상': { min: 70, max: 100 },
} as const;

// 정렬 옵션
export const SORT_OPTIONS: SortOption[] = ['RECOMMENDED', 'POPULAR', 'PRICE_LOW', 'PRICE_HIGH'];

// 정렬 옵션 표시 매핑
export const SORT_DISPLAY_MAP: Record<SortOption, string> = {
  'RECOMMENDED': '추천순',
  'POPULAR': '인기순',
  'PRICE_LOW': '낮은가격순',
  'PRICE_HIGH': '높은가격순'
};

// 촬영 시기 옵션
export const SHOOTING_PERIOD_OPTIONS: ShootingPeriod[] = [
  'YEAR_2025_FIRST_HALF',
  'YEAR_2025_SECOND_HALF',
  'YEAR_2026_FIRST_HALF',
  'YEAR_2026_SECOND_HALF'
];

// 촬영 시기 표시 매핑
export const SHOOTING_PERIOD_DISPLAY_MAP: Record<ShootingPeriod, string> = {
  'YEAR_2025_FIRST_HALF': '2025년 상반기',
  'YEAR_2025_SECOND_HALF': '2025년 하반기',
  'YEAR_2026_FIRST_HALF': '2026년 상반기',
  'YEAR_2026_SECOND_HALF': '2026년 하반기'
};

// 카메라 종류 옵션
export const CAMERA_OPTIONS: CameraType[] = ['DIGITAL', 'FILM'];

// 카메라 종류 표시 매핑
export const CAMERA_DISPLAY_MAP: Record<CameraType, string> = {
  'DIGITAL': '디지털',
  'FILM': '필름'
};

// 보정 스타일 옵션
export const STYLE_OPTIONS: RetouchStyle[] = [
  'MODERN', 'CHIC', 'CALM', 'VINTAGE', 'FAIRYTALE', 'WARM', 'DREAMY', 'BRIGHT', 'NATURAL'
];

// 보정 스타일 표시 매핑
export const STYLE_DISPLAY_MAP: Record<RetouchStyle, string> = {
  'MODERN': '모던한',
  'CHIC': '시크한',
  'CALM': '안정적인',
  'VINTAGE': '빈티지한',
  'FAIRYTALE': '동화같은',
  'WARM': '따뜻한',
  'DREAMY': '꿈결은',
  'BRIGHT': '밝은',
  'NATURAL': '자연스러운'
};

// 패키지 옵션
export const PACKAGE_OPTIONS: PackageType[] = [
  'HAIR_MAKEUP', 'DRESS', 'MENS_SUIT', 'BOUQUET', 'VIDEO', 'STUDIO', 'ETC'
];

// 패키지 표시 매핑
export const PACKAGE_DISPLAY_MAP: Record<PackageType, string> = {
  'HAIR_MAKEUP': '헤어/메이크업',
  'DRESS': '드레스',
  'MENS_SUIT': '남성용 수트',
  'BOUQUET': '부케',
  'VIDEO': '비디오',
  'STUDIO': '스튜디오',
  'ETC': '기타'
};

// 필터 초기 상태
export const INITIAL_FILTER_STATE: Record<FilterType, FilterValue> = {
  정렬: '',
  촬영시기: [],
  카메라종류: [],
  보정스타일: [],
  패키지: '',
  가격: { min: undefined, max: undefined },
};
