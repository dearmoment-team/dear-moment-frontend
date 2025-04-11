'use client';

import { Chip } from '@/components/ui/Chip';
import { Dispatch, SetStateAction } from 'react';
import { MainLikeProduct, MainLikeStudio } from '@/api/likes/types';
import { useFilteringController } from '@/like/controllers/FilteringController';
import {
  CAMERA_DISPLAY_MAP,
  PACKAGE_DISPLAY_MAP,
  SHOOTING_PERIOD_DISPLAY_MAP,
  SORT_DISPLAY_MAP,
  STYLE_DISPLAY_MAP,
} from '@/(home)/models/FilteringModel';
import { CameraType, PackageType, PriceRange, RetouchStyle, ShootingPeriod, SortOption } from '@/(home)/type';
import FilteringModal from '@/like/_components/Filtering/FilteringModal';

interface FilteringProps<T extends MainLikeProduct | MainLikeStudio> {
  setMainProducts: Dispatch<SetStateAction<T[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  fetchMainProducts?: () => Promise<void>;
}

export default function Filtering<T extends MainLikeProduct | MainLikeStudio>({
  setMainProducts,
  setLoading,
  setError,
  fetchMainProducts,
}: FilteringProps<T>) {
  const { open, setOpen, filterType, selectedFilters, setSelectedFilters, handleFilterClick, applyFiltersAndSearch } =
    useFilteringController({
      setMainProducts,
      setLoading,
      setError,
      fetchMainProducts,
    });

  const { sortBy, shootingPeriod, cameraType, retouchStyle, packageType, priceRange } = selectedFilters;

  // 가격 범위 표시 텍스트 생성
  const getPriceRangeText = (priceRange: PriceRange) => {
    // 가격이 선택되지 않았거나 min, max가 없는 경우
    if (!priceRange.min && !priceRange.max) return '가격';
    if (priceRange.min && priceRange.min === 201) return '200만원 초과';
    if (priceRange.max && priceRange.max > 200) return `${priceRange.min}만원 - 200만원 초과`;
    return `${priceRange.min}만원 - ${priceRange.max}만원`;
  };

  // 보정 스타일 리스트 및 표시 텍스트 생성
  const retouchStyleList = retouchStyle as RetouchStyle[];
  const retouchStyleText =
    retouchStyleList.length > 0
      ? `${STYLE_DISPLAY_MAP[retouchStyleList[0]] || retouchStyleList[0]} ${
          retouchStyleList.length > 1 ? `외 ${retouchStyleList.length - 1}` : ''
        }`
      : '';

  // 촬영 시기 리스트 및 표시 텍스트 생성
  const shootingPeriodList = shootingPeriod as ShootingPeriod[];
  const shootingPeriodText =
    shootingPeriodList.length > 0
      ? `${SHOOTING_PERIOD_DISPLAY_MAP[shootingPeriodList[0]] || shootingPeriodList[0]} ${
          shootingPeriodList.length > 1 ? `외 ${shootingPeriodList.length - 1}` : ''
        }`
      : '';

  // 카메라 종류 리스트 및 표시 텍스트 생성
  const cameraTypeList = cameraType as CameraType[];
  const cameraTypeText =
    cameraTypeList.length > 0
      ? `${CAMERA_DISPLAY_MAP[cameraTypeList[0]] || cameraTypeList[0]} ${
          cameraTypeList.length > 1 ? `외 ${cameraTypeList.length - 1}` : ''
        }`
      : '';

  // 패키지 리스트 및 표시 텍스트 생성
  const packageList = packageType as PackageType[];
  const packageText =
    packageList.length > 0
      ? `${PACKAGE_DISPLAY_MAP[packageList[0]] || packageList[0]} ${
          packageList.length > 1 ? `외 ${packageList.length - 1}` : ''
        }`
      : '';

  return (
    <div className="overflow-x-auto scroll scrollbar-hide mx-[2rem]">
      <div className="flex gap-2">
        <Chip
          onClick={() => handleFilterClick('sortBy')}
          active
          background={selectedFilters.sortBy !== '' ? 'inverse' : 'default'}
          label={selectedFilters.sortBy ? SORT_DISPLAY_MAP[selectedFilters.sortBy as SortOption] : '정렬'}
        />
        <Chip
          onClick={() => handleFilterClick('shootingPeriod')}
          active
          background={(selectedFilters.shootingPeriod as ShootingPeriod[])?.length > 0 ? 'inverse' : 'default'}
          label="촬영시기"
        />
        <Chip
          onClick={() => handleFilterClick('cameraType')}
          active
          background={(selectedFilters.cameraType as CameraType[])?.length > 0 ? 'inverse' : 'default'}
          label="카메라종류"
        />
        <Chip
          onClick={() => handleFilterClick('retouchStyle')}
          active
          background={(selectedFilters.retouchStyle as RetouchStyle[])?.length > 0 ? 'inverse' : 'default'}
          label="보정스타일"
        />
        <Chip
          onClick={() => handleFilterClick('packageType')}
          active
          background={(selectedFilters.packageType as PackageType[])?.length > 0 ? 'inverse' : 'default'}
          label="패키지"
        />
        <Chip
          onClick={() => handleFilterClick('priceRange')}
          active
          background={
            (selectedFilters.priceRange as PriceRange)?.min !== 0 ||
            (selectedFilters.priceRange as PriceRange)?.max !== 100
              ? 'inverse'
              : 'default'
          }
          label="가격"
        />
      </div>
      <FilteringModal
        open={open}
        onOpenChange={setOpen}
        filterType={filterType}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        applyFiltersAndSearch={applyFiltersAndSearch}
      />
    </div>
  );
}
