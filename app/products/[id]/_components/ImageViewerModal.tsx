'use client';

import { Icon_ChevronDown } from '@/assets/icons';
import { useSwipe } from '@/hooks/useSwipe';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[]; // 이미지 URL 배열
  initialImageIndex: number; // 처음 보여줄 이미지 인덱스
}

export function ImageViewerModal({ isOpen, onClose, images, initialImageIndex }: ImageViewerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const carouselImages = useMemo(() => {
    // 첫 번째 이미지와 마지막 이미지를 하나 더 추가
    return [images[images.length - 1], ...images, images[0]];
  }, [images]);

  const getCarouselStyle = () => {
    return {
      transform: `translateX(-${currentIndex * 100}%)`,
      transition: isTransitionEnabled ? 'transform 0.5s ease-in-out' : '',
    };
  };

  // 외부에서 사용자가 선택한 이미지 인덱스가 변경될 때
  useLayoutEffect(() => {
    // 기존 이미지 앞에 추가된 이미지 때문에 +1
    setCurrentIndex(initialImageIndex + 1);
  }, [initialImageIndex]);

  // currentIndex가 변경될 때마다 실행
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // 마지막 슬라이드에서 첫 번째 슬라이드로 이동할 때 transition 없이 이동
    if (currentIndex === 0) {
      timerId = setTimeout(() => {
        setCurrentIndex(carouselImages.length - 2);
        setIsTransitionEnabled(false);
      }, 500);
    } else if (currentIndex === carouselImages.length - 1) {
      timerId = setTimeout(() => {
        setCurrentIndex(1);
        setIsTransitionEnabled(false);
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [currentIndex, carouselImages.length]);

  // 이전 이미지로 이동
  const handlePrevious = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex(prev => prev - 1);
  };

  // 다음 이미지로 이동
  const handleNext = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex(prev => prev + 1);
  };

  // useSwipe 훅 사용
  const { handlers } = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
  });

  if (!isOpen) return null;

  return (
    // 모달 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-95">
      {/* 이미지 컨테이너 */}
      <div
        className="container relative flex h-full items-center justify-center"
        onClick={e => e.stopPropagation()}
        {...handlers} // 터치 이벤트 핸들러 추가
      >
        {/* 이전 버튼 */}
        <button
          onClick={handlePrevious}
          className="absolute left-[2rem] top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-common-100 p-2"
        >
          <Icon_ChevronDown className="-translate-x-[0.1rem] rotate-90 fill-white" />
        </button>
        <div className="relative h-full w-full overflow-hidden">
          <div style={getCarouselStyle()} className="flex h-full w-full">
            {carouselImages.map((img, index) => (
              <div key={`${img}-${index}`} className="flex h-full w-full flex-shrink-0">
                <img src={img} alt={`포트폴리오 이미지 ${index + 1}`} className="object-contain" />
              </div>
            ))}
          </div>
          {/* 이미지 카운터 */}
          <div className="absolute bottom-[3rem] left-1/2 -translate-x-1/2 transform text-white">
            {currentIndex} / {images.length}
          </div>
        </div>
        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className="absolute right-[2rem] top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-common-100 p-2"
        >
          <Icon_ChevronDown className="translate-x-[0.1rem] -rotate-90 fill-white" />
        </button>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute left-[2rem] top-[2rem] rounded-full bg-common-100 p-2 text-[2.4rem] text-white"
        >
          <Icon_ChevronDown className="rotate-90 fill-gray-10" />
        </button>
      </div>
    </div>
  );
}
