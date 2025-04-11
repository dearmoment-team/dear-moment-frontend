import { Dispatch, SetStateAction, useState } from 'react';
import { searchMainLikeProductsPage, searchMainLikeStudioPage } from '../../api/likes';
import { FilteringService } from '@/(home)/services/FilteringService';
import {
  CameraType,
  FilterType,
  FilterValue,
  PackageType,
  PriceRange,
  RetouchStyle,
  ShootingPeriod,
  SortOption,
} from '@/(home)/type';
import { MainLikeProduct, MainLikeStudio } from '@/api/likes/types';

// 메인 페이지 상태값 전달(로딩, 에러, 상품)
interface UseFilteringControllerProps<T> {
  setMainProducts: Dispatch<SetStateAction<T[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  fetchMainProducts?: () => Promise<void>; // 메인 페이지 상품 목록을 가져오는 함수
  isStudioList?: boolean; // 스튜디오 목록 여부
}

export function useFilteringController<T extends MainLikeProduct | MainLikeStudio>({
  setMainProducts,
  setLoading,
  setError,
  fetchMainProducts,
  isStudioList = false,
}: UseFilteringControllerProps<T>) {
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('sortBy');
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterType, FilterValue>>(
    FilteringService.getInitialFilterState()
  );

  const handleFilterClick = (type: FilterType) => {
    setFilterType(type);
    setOpen(true);
  };

  // 필터를 적용하여 검색 API 호출하는 함수
  const applyFiltersAndSearch = async (filters: Record<FilterType, FilterValue>) => {
    try {
      setLoading(true);
      setError(null);

      // 필터가 초기화되었는지 확인
      const isInitialState = isFilterInitialState(filters);

      // 필터가 초기화된 경우 기본 메인 페이지 데이터를 가져옴
      if (isInitialState && fetchMainProducts) {
        await fetchMainProducts();
        return;
      }

      // 필터 데이터 변환
      const searchFilters = {
        sortBy: filters.sortBy ? [filters.sortBy as SortOption] : [],
        availableSeasons: (filters.shootingPeriod as ShootingPeriod[]) || [],
        cameraTypes: (filters.cameraType as CameraType[]) || [],
        retouchStyles: (filters.retouchStyle as RetouchStyle[]) || [],
        partnerShopCategories: (filters.packageType as PackageType[]) || [],
        minPrice: ((filters.priceRange as PriceRange).min || 0) * 10000,
        maxPrice: ((filters.priceRange as PriceRange).max || 100) * 10000,
      };

      // 스튜디오 목록 여부에 따라 다른 API 호출
      if (isStudioList) {
        const studios = await searchMainLikeStudioPage(searchFilters);
        setMainProducts(studios as T[]);
      } else {
        const products = await searchMainLikeProductsPage(searchFilters);
        setMainProducts(products as T[]);
      }
    } catch (error) {
      console.error('상품 검색 실패:', error);
      setError('상품 검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 필터가 초기 상태인지 확인하는 함수
  const isFilterInitialState = (filters: Record<FilterType, FilterValue>): boolean => {
    const initialState = FilteringService.getInitialFilterState();

    // 정렬 옵션 확인
    if (filters.sortBy !== initialState.sortBy) return false;

    // 촬영시기 확인 (배열)
    const shootingPeriods = filters.shootingPeriod as ShootingPeriod[];
    if (shootingPeriods && shootingPeriods.length > 0) return false;

    // 카메라 타입 확인 (배열)
    const cameraTypes = filters.cameraType as CameraType[];
    if (cameraTypes && cameraTypes.length > 0) return false;

    // 보정 스타일 확인 (배열)
    const retouchStyles = filters.retouchStyle as RetouchStyle[];
    if (retouchStyles && retouchStyles.length > 0) return false;

    // 패키지 타입 확인 (배열)
    const packageTypes = filters.packageType as PackageType[];
    if (packageTypes && packageTypes.length > 0) return false;

    // 가격 범위 확인
    const priceRange = filters.priceRange as PriceRange;
    const initialPriceRange = initialState.priceRange as PriceRange;

    if (priceRange.min !== initialPriceRange.min || priceRange.max !== initialPriceRange.max) {
      return false;
    }

    return true;
  };

  return {
    open,
    setOpen,
    filterType,
    setFilterType,
    selectedFilters,
    setSelectedFilters,
    handleFilterClick,
    applyFiltersAndSearch,
  };
}
