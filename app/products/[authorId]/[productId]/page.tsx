'use client';

import { fetchProductDetail } from '@/api';
import { ApiErrorImpl } from '@/api/error';
import { Product, ProductOption } from '@/api/products/types';
import { Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productOption, setProductOption] = useState<ProductOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // 상품 정보를 가져오는 함수
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        // API를 통해 상품 정보 가져오기
        const response = await fetchProductDetail(Number(params.authorId));

        if (response.success && response.data) {
          setProduct(response.data);

          // API 응답에서 해당 옵션 찾기
          if (response.data.options) {
            const option = response.data.options.find(opt => opt.optionId === Number(params.productId));
            if (option) {
              setProductOption(option);
            } else {
              setError('해당 상품 옵션을 찾을 수 없습니다.');
            }
          } else {
            setError('상품 옵션 정보가 없습니다.');
          }

          console.log('상품 상세 데이터:', response.data);
        } else {
          setError('상품 데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('상품 정보를 불러오는데 실패했습니다:', error);

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

    fetchProductData();
  }, [params.authorId, params.productId]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="p-[2rem] bg-red-100 border border-red-400 text-red-700 rounded relative">{error}</div>;
  if (!product || !productOption) return <div className="p-[2rem]">상품을 찾을 수 없습니다.</div>;

  // 상품 옵션 상세 정보 구성
  const productDetailsEntry = {
    시간: `${productOption.shootingHours}시간 ${productOption.shootingMinutes}분`,
    장소: `${productOption.shootingLocationCount}곳`,
    의상: `최대 ${productOption.costumeCount}벌`,
    보정본: `${productOption.retouchedCount}장`,
    가격: productOption.discountPrice
      ? `${productOption.discountPrice.toLocaleString()}원`
      : `${productOption.originalPrice.toLocaleString()}원`,
  };

  return (
    <div className="relative w-full max-w-screen-md mx-auto text-gray-90 pb-[7.6rem]">
      {/* 분홍 배경색 */}
      <div className="absolute -top-[8.2rem] left-0 w-full h-[24.6rem] bg-red-10 -z-10" />
      {/* 상품 헤더 */}
      <div className="flex flex-col items-center mt-[2.8rem]">
        <div className="w-[5.7rem] h-[5.7rem] bg-gray-40 rounded-full" />
        <span className="text-body1Normal font-semibold mt-[1rem] mb-[2.2rem]">{product.title}</span>
        <span className="text-subtitle1 font-bold text-gray-95">{productOption.name}</span>
      </div>

      {/* 상품 상세 정보 */}
      <div className="mt-[7.2rem] px-[2rem]">
        <div>
          <span className="text-subtitle1 font-bold text-gray-95">상품 설명</span>

          {/* 옵션 상세 정보 */}
          <div className="space-y-[1.6rem] mt-[4rem]">
            {Object.entries(productDetailsEntry).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-body3Normal font-semibold text-gray-60">{key}</span>
                <span className="text-body3Normal font-semibold text-gray-80">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 회색 경계선 */}
        <div className="bg-gray-10 h-[0.8rem] my-[4.3rem]" />

        {/* 상품 설명 */}
        <div>
          <p className="text-body3Normal text-gray-80">{productOption.description || product.description}</p>
        </div>
      </div>

      {/* 문의하기 버튼 컨테이너 스타일 수정 */}
      <div className="container fixed bottom-0 left-0 right-0 px-[2rem] py-[1rem] bg-white">
        <div className="max-w-screen-md mx-auto flex gap-[1rem] justify-between items-center">
          <button
            className="w-[6.8rem] h-[5.6rem] flex justify-center items-center bg-red-0 border border-red-40 rounded-[0.4rem]"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button className="w-[24.2rem] h-[5.6rem] text-body1Normal font-semibold text-gray-10 bg-red-40 rounded-[0.4rem]">
            바로 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
