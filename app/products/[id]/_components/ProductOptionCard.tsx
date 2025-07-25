'use client';

import { ProductOption } from '@/api/products/types';
import { Icon_ChevronDown, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import { useRouter } from 'next/navigation';
import { useProductOptionController } from '../controllers/productOptionController';

interface ProductOptionCardProps {
  productOption: ProductOption;
  productId?: string;
}

export const ProductOptionCard = ({ productOption, productId }: ProductOptionCardProps) => {
  const router = useRouter();
  const { isLiked, onClickHeart } = useProductOptionController({ productOption });

  const productDetailsEntry = {
    시간: `${productOption.shootingHours}시간 ${productOption.shootingMinutes}분`,
    장소: `${productOption.shootingLocationCount}곳`,
    의상: `최대 ${productOption.costumeCount}벌`,
    보정본: `${productOption.retouchedCount}장`,
  };

  const hasDiscount = productOption.originalPrice - productOption.discountPrice > 0;
  const discountRate = Math.floor(
    ((productOption.originalPrice - productOption.discountPrice) / productOption.originalPrice) * 100
  );

  const handleDetailClick = () => {
    router.push(`/options/${productId}/${productOption.optionId}`);
  };

  return (
    <li className="bg-gray-10 px-[2rem] py-[1.5rem]">
      {/* 카드 헤더 */}
      <div className="mb-[1.6rem] flex items-start justify-between">
        <div className="flex items-center gap-[1rem]">
          <div className="flex flex-col gap-[0.3rem]">
            <span className="text-subtitle2 font-bold text-gray-90">{productOption.name}</span>
            {hasDiscount ? (
              <div>
                <p className="my-[0.6rem] text-body2Normal font-bold text-gray-60 line-through">
                  {productOption.originalPrice.toLocaleString()}원
                </p>
                <div className="text-subtitle2 font-bold">
                  <span className="text-red-40">{discountRate}%</span>
                  <span className="ml-[0.3rem] text-gray-80">{productOption.discountPrice?.toLocaleString()}원</span>
                </div>
              </div>
            ) : (
              <span className="text-subtitle2 font-bold text-gray-80">
                {productOption.originalPrice.toLocaleString()}원
              </span>
            )}
          </div>
        </div>
        <button type="button" onClick={onClickHeart} className="">
          {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
        </button>
      </div>

      {/* 카드 컨텐츠 */}
      <div className="space-y-[1.6rem] border-b border-t border-gray-20 py-[2.6rem]">
        {Object.entries(productDetailsEntry).map(([key, value]) => {
          return (
            <div key={key} className="flex justify-between">
              <span className="text-body3Normal font-semibold text-gray-60">{key}</span>
              <span className="text-body3Normal font-semibold text-gray-80">{value}</span>
            </div>
          );
        })}
      </div>

      {/* 자세히 보기 */}
      <button className="mt-[1.6rem] flex w-full items-center justify-center gap-[0.6rem]" onClick={handleDetailClick}>
        <span className="text-body2Normal font-semibold text-gray-60">자세히 보기</span>
        <Icon_ChevronDown className="-rotate-90 fill-gray-60" width={18} height={18} />
      </button>
    </li>
  );
};
