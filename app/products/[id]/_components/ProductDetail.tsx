'use client';

import { CAMERA_DISPLAY_MAP, STYLE_DISPLAY_MAP } from '@/(home)/models/FilteringModel';
import { CameraType, RetouchStyle } from '@/(home)/type';
import { Product } from '@/api/products/types';
import { Icon_Calendar, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import Image from 'next/image';
import { useState } from 'react';
import { ImageViewerModal } from './ImageViewerModal';
import { InquiryBottomSheet } from './InquiryBottomSheet';
import ProductTabs from './ProductTabs';

interface ProductDetailProps {
  initialProduct: Product | null;
  initialError: string | null;
}

export default function ProductDetail({ initialProduct, initialError }: ProductDetailProps) {
  // 클라이언트 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const portfolioImages = initialProduct?.subImages.map(img => img.url) ?? [];

  if (initialError) {
    return (
      <div className="p-[2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{initialError}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-md mx-auto">
      {/* 대표 이미지 */}
      <div className="relative w-full h-[286px]">
        <Image src={initialProduct?.mainImage.url ?? ''} alt="main_image" fill className="object-contain" />
      </div>

      {/* 작가 정보 섹션 */}
      <div className="">
        {/* 작가정보 헤더 */}
        <div className="p-[2rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="w-[5.7rem] h-[5.7rem] rounded-full bg-gray-40" />
            <div className="space-y-[0.8rem] py-[0.7rem]">
              <span className="text-gray-90 text-subtitle2 font-bold">{initialProduct?.title}</span>
              <div className="flex gap-[0.5rem]">
                {initialProduct?.retouchStyles.map(style => (
                  <div
                    key={style}
                    className="text-gray-80 text-label2 font-semibold bg-red-20 px-[0.8rem] py-[0.45rem]"
                  >
                    {STYLE_DISPLAY_MAP[style as RetouchStyle]}
                  </div>
                ))}
              </div>
            </div>
            <button className="ml-auto" onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
            </button>
          </div>
          <div className="mt-[1.4rem]">
            <p className="text-body2Reading font-bold">{initialProduct?.description}</p>
            <p className="text-body2Reading font-bold">{initialProduct?.detailedInfo}</p>
          </div>
          <div className="flex gap-[0.5rem] mt-[1.4rem] items-center">
            <Icon_Calendar width={14} height={14} />
            <div className="flex gap-[0.6rem] items-center">
              {initialProduct?.availableSeasons.map((season, index) => (
                <span
                  key={index}
                  className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]"
                >
                  {season.replace('YEAR_', '').replace('_FIRST_HALF', '년 상반기').replace('_SECOND_HALF', '년 하반기')}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-[0.5rem] mt-[0.6rem] items-center">
            <Icon_Calendar width={14} height={14} />
            <div className="flex gap-[0.6rem] items-center">
              {initialProduct?.cameraTypes.map((cameraType, index) => (
                <span
                  key={index}
                  className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]"
                >
                  {CAMERA_DISPLAY_MAP[cameraType as CameraType]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 작가 정보 컨텐츠 */}
        <div className="">
          {/* 작가 포트폴리오 */}
          <div className="mt-[0.6rem] px-[2rem]">
            <p className="text-gray-95 text-body2Normal font-semibold mb-[2rem]">
              {initialProduct?.title}의 포트폴리오
            </p>
            <div className="flex gap-[0.2rem] flex-wrap">
              {portfolioImages?.map((imgSrc, index) => {
                if (index > 7) return null;
                return (
                  <div key={index} className="relative cursor-pointer" onClick={() => setSelectedImageIndex(index)}>
                    <Image src={imgSrc} alt="sub_image" width={78} height={78} className="object-contain" />
                    {index === 7 && (
                      <div className="absolute w-full h-full bg-gray-30 top-0 left-0 opacity-90 flex justify-center items-center">
                        <span className="text-body3Normal text-common-0">+{8 - index}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 상품정보, 안내사항 탭 */}
        <ProductTabs
          productOptions={initialProduct?.options ?? []}
          guidelines={['guildline1', 'guildline2']}
          product={initialProduct}
        />

        {/* 문의하기 버튼 */}
        <div className="h-[5.6rem] mb-[1.2rem] flex gap-[1rem] justify-between items-center px-[2rem]">
          <button
            className="w-[6.8rem] h-full flex justify-center items-center bg-red-0 border border-red-40 rounded-[0.4rem] cursor-pointer"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button
            className="w-[24.2rem] h-full text-body1Normal font-semibold text-gray-10 bg-red-40 rounded-[0.4rem]"
            onClick={() => setOpenInquiry(true)}
          >
            문의하기
          </button>
        </div>
      </div>

      {/* 문의하기 Popup */}
      <InquiryBottomSheet
        productOptions={initialProduct?.options ?? []}
        open={openInquiry}
        onOpenChange={setOpenInquiry}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />

      {/* 이미지 뷰어 모달 */}
      <ImageViewerModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={portfolioImages ?? []}
        initialImageIndex={selectedImageIndex || 0}
      />
    </div>
  );
}
