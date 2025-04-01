/* eslint-disable @next/next/no-img-element */
'use client';

import { CAMERA_DISPLAY_MAP, STYLE_DISPLAY_MAP } from '@/(home)/models/FilteringModel';
import { CameraType, RetouchStyle } from '@/(home)/type';
import { fetchProductDetail } from '@/api';
import { ApiErrorImpl } from '@/api/error';
import { Product } from '@/api/products/types';
import { Icon_Calendar, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthorTabs from './_components/AuthorTabs';
import { ImageViewerModal } from './_components/ImageViewerModal';
import { InquiryBottomSheet } from './_components/InquiryBottomSheet';

export default function AuthorDetailPage() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [author, setAuthor] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 작가 정보를 가져오는 API 호출
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchProductDetail(Number(params.id));

        console.log('====Res: ', response);

        // API 응답 구조 변경에 따른 처리
        if (response.success && response.data) {
          setAuthor(response.data);
          console.log('메인 페이지 상품 데이터:', response);
        } else {
          setError('상품 데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('상품 데이터 가져오기 실패:', error);

        // 에러 유형에 따른 처리
        if (error instanceof ApiErrorImpl) {
          switch (error.code) {
            case 'NOT_FOUND':
              setError('상품 데이터를 찾을 수 없습니다.');
              break;
            case 'UNAUTHORIZED':
              setError('인증이 필요합니다.');
              break;
            default:
              setError(`오류가 발생했습니다: ${error.message}`);
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [params.id]);

  const portfolioImages = author?.subImages.map(img => img.url);

  if (loading)
    return (
      <div className="p-[2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="p-[2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
      </div>
    );
  if (!author)
    return (
      <div className="p-[2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-gray-90 text-body1Normal font-semibold px-4 py-3 rounded relative">
          상품을 찾을 수 없습니다.
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-screen-md mx-auto">
      {/* 대표 이미지 */}
      <div className="relative w-full h-[400px]">
        <img src={author.mainImage.url} alt="대표 이미지" className="w-full h-full object-cover" />
      </div>

      {/* 작가 정보 섹션 */}
      <div className="">
        {/* 작가정보 헤더 */}
        <div className="p-[2rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="w-[5.7rem] h-[5.7rem] rounded-full bg-gray-40" />
            <div className="space-y-[0.8rem] py-[0.7rem]">
              <span className="text-gray-90 text-subtitle2 font-bold">{author.title}</span>
              <div className="flex gap-[0.5rem]">
                {author.retouchStyles.map(style => (
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
            <p className="text-body2Reading font-bold">{author.description}</p>
            <p className="text-body2Reading font-bold">{author.detailedInfo}</p>
          </div>
          <div className="flex gap-[0.5rem] mt-[1.4rem] items-center">
            <Icon_Calendar width={14} height={14} />
            <div className="flex gap-[0.6rem] items-center">
              {author.availableSeasons.map((season, index) => (
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
              {author.cameraTypes.map((cameraType, index) => (
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
            <p className="text-gray-95 text-body2Normal font-semibold mb-[2rem]">{author.title}의 포트폴리오</p>
            <div className="flex gap-[0.2rem] flex-wrap">
              {portfolioImages?.map((imgSrc, index) => {
                if (index > 7) return;
                return (
                  <div key={index} className="relative cursor-pointer" onClick={() => setSelectedImageIndex(index)}>
                    <img src={imgSrc} alt="대표 이미지" className="object-cover w-[7.8rem] h-[7.8rem]" />
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
        <AuthorTabs products={author.options} guidelines={['guildline1', 'guildline2']} author={author} />

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
      <InquiryBottomSheet open={openInquiry} onOpenChange={setOpenInquiry} isLiked={isLiked} setIsLiked={setIsLiked} />

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
