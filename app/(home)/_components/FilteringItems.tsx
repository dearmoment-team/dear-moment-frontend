'use client';

import { Chip } from '@/components/ui/Chip';
import { Slider } from '@/components/ui/slider';
import { Dispatch, SetStateAction } from 'react';
import { useFilteringItemsController } from '../controllers/FilteringItemsController';
import { FilteringService } from '../services/FilteringService';
import {
  CameraType,
  FilterType,
  FilterValue,
  PackageType,
  PriceRange,
  RetouchStyle,
  ShootingPeriod,
  SortOption,
} from '../type';

interface FilteringItemsProps {
  onOpenChange: (open: boolean) => void;
  filterType: FilterType;
  selectedFilters: Record<FilterType, FilterValue>;
  setSelectedFilters: Dispatch<SetStateAction<Record<FilterType, FilterValue>>>;
  applyFiltersAndSearch?: (filters: Record<FilterType, FilterValue>) => Promise<void>;
}

export const FilteringItems = ({
  onOpenChange,
  filterType,
  selectedFilters,
  setSelectedFilters,
  applyFiltersAndSearch,
}: FilteringItemsProps) => {
  const { tempFilters, handleFilterSelect, handleSliderChange, handleReset, handleApply } = useFilteringItemsController(
    {
      filterType,
      selectedFilters,
      setSelectedFilters,
      onOpenChange,
      applyFiltersAndSearch,
    }
  );

  const {
    getSortOptions,
    getShootingPeriodOptions,
    getCameraOptions,
    getStyleOptions,
    getPackageOptions,
    getPriceRangeOptions,
  } = FilteringService;

  // 각 필터 옵션의 원본 값 (enum 값)
  const filterOptions: Record<FilterType, readonly string[]> = {
    정렬: getSortOptions() as unknown as readonly string[],
    촬영시기: getShootingPeriodOptions() as unknown as readonly string[],
    카메라종류: getCameraOptions() as unknown as readonly string[],
    보정스타일: getStyleOptions() as unknown as readonly string[],
    패키지: getPackageOptions() as unknown as readonly string[],
    가격: getPriceRangeOptions(),
  };

  // 각 필터 옵션의 표시 텍스트 매핑
  const getDisplayText = (type: FilterType, value: string): string => {
    switch (type) {
      case '정렬':
        return FilteringService.getSortDisplayMap()[value as SortOption] || value;
      case '촬영시기':
        return FilteringService.getShootingPeriodDisplayMap()[value as ShootingPeriod] || value;
      case '카메라종류':
        return FilteringService.getCameraDisplayMap()[value as CameraType] || value;
      case '보정스타일':
        return FilteringService.getStyleDisplayMap()[value as RetouchStyle] || value;
      case '패키지':
        return FilteringService.getPackageDisplayMap()[value as PackageType] || value;
      default:
        return value;
    }
  };

  const 가격 = tempFilters.가격 as PriceRange;
  const 가격범위텍스트 = !가격.min && !가격.max ? '-' : `${가격.min}만원 - ${가격.max}만원`;

  return (
    <div className="space-y-[2.2rem]">
      {Object.keys(tempFilters).map(title => {
        return (
          <Category
            key={title}
            title={title as FilterType}
            items={filterOptions[title as FilterType]}
            tempFilters={tempFilters}
            handleFilterSelect={handleFilterSelect}
            getDisplayText={getDisplayText}
          />
        );
      })}
      {/* 가격 슬라이더 */}
      <div className="relative pt-[1.8rem]">
        <div className="absolute -top-3 left-4 text-label1Normal font-medium text-common-100">0 만원</div>
        <div className="absolute -top-3 right-4 text-label1Normal font-medium text-common-100">100 만원</div>
        <Slider
          defaultValue={[0, 100]}
          min={0}
          max={100}
          step={1}
          value={[가격.min ?? 0, 가격.max ?? 0]}
          onValueChange={handleSliderChange}
        />
        <div className="mt-4 text-center text-label1Normal font-medium text-gray-70">{가격범위텍스트}</div>
      </div>
      <div className="flex justify-between items-end bg-white gap-[1rem] absolute bottom-0 right-0 w-full pb-[1.2rem] px-[2rem] h-[10rem]">
        <button
          className="w-[8.9rem] bg-red-0 text-body1Normal font-semibold rounded-[0.4rem] border border-red-40 text-red-40 h-[56px]"
          onClick={handleReset}
        >
          초기화
        </button>
        <button
          className="w-[22.1rem] bg-red-40 text-body1Normal font-semibold rounded-[0.4rem] text-gray-10 h-[56px]"
          onClick={handleApply}
        >
          적용
        </button>
      </div>
    </div>
  );
};

const Category = ({
  title,
  items,
  tempFilters,
  handleFilterSelect,
  getDisplayText,
}: {
  title: FilterType;
  items: readonly string[];
  tempFilters: Record<FilterType, FilterValue>;
  handleFilterSelect: (section: FilterType, value: string) => void;
  getDisplayText: (type: FilterType, value: string) => string;
}) => {
  return (
    <div className="space-y-[1.8rem]">
      <p className="text-body2Normal font-semibold text-gray-95">{title}</p>
      <div className="flex flex-wrap gap-[0.6rem]">
        {items.map(item => {
          let isSelected = false;

          if (title === '가격') {
            // 가격 범위 비교 로직
            const currentRange = tempFilters[title] as PriceRange;
            const buttonRange = FilteringService.getPriceRangeFromValue(item);

            // 현재 선택된 범위와 버튼의 범위가 겹치는지 확인
            isSelected =
              currentRange?.min !== undefined &&
              currentRange?.max !== undefined &&
              buttonRange.min !== undefined &&
              buttonRange.max !== undefined &&
              // 버튼의 최소값이 현재 범위 내에 있거나
              ((buttonRange.min >= currentRange.min && buttonRange.min <= currentRange.max) ||
                // 버튼의 최대값이 현재 범위 내에 있거나
                (buttonRange.max >= currentRange.min && buttonRange.max <= currentRange.max) ||
                // 버튼의 범위가 현재 범위를 포함하는 경우
                (buttonRange.min <= currentRange.min && buttonRange.max >= currentRange.max));
          } else {
            // 기존 로직 유지
            isSelected = Array.isArray(tempFilters[title])
              ? (tempFilters[title] as string[]).includes(item)
              : tempFilters[title] === item;
          }

          return (
            <Chip
              key={item}
              label={getDisplayText(title, item)}
              background={isSelected ? 'inverse' : 'default'}
              onClick={() => handleFilterSelect(title, item)}
            />
          );
        })}
      </div>
    </div>
  );
};
