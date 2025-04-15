import Image from 'next/image';
import { MainLikeProduct } from '@/api/likes/types';
import { Icon_Heart_Filled, Icon_Calendar, Icon_ChevronDown, Icon_Heart } from '@/assets/icons';
import { addOptionLike, removeOptionLike } from '@/api/likes';
import { useState } from 'react';
import { SHOOTING_PERIOD_DISPLAY_MAP } from '@/(home)/models/FilteringModel';
import { ShootingPeriod } from '@/(home)/type';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  likeProducts: MainLikeProduct;
  onLikeChange?: () => void;
}

interface LikeItemProps {
  label: string;
  value: string | number | boolean;
  unit?: string;
  booleanText?: { true: string; false: string };
}

const InfoItem = ({ label, value, unit = '', booleanText }: LikeItemProps) => {
  const displayValue =
    typeof value === 'boolean'
      ? booleanText
        ? value
          ? booleanText.true
          : booleanText.false
        : value.toString()
      : `${value}${unit}`;

  return (
    <div className="w-[13.5rem] h-[1.8rem] flex justify-between py-3 flex-1">
      <span className="font-semibold text-body3Normal">{label}</span>
      <span className="font-regular text-body3Normal">{displayValue}</span>
    </div>
  );
};

export default function ProductCard({ likeProducts, onLikeChange }: ProductCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(!!likeProducts);

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        // 좋아요 취소
        await removeOptionLike({ likeId: likeProducts.likeId, optionId: likeProducts.productOptionId });
      } else {
        // 좋아요 추가
        await addOptionLike(likeProducts.productOptionId);
      }
      setIsLiked(!isLiked);
      onLikeChange?.();
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  // 상품 옵션 설명 페이지로 이동
  const handlePageProductOptionClick = () => {
    console.log('likeProducts룰라', likeProducts);
    router.push(`/options/${likeProducts.productId}/${likeProducts.productOptionId}`);
  };

  // 상품 페이지로 이동
  const handlePageProductClick = () => {
    router.push(`/products/${likeProducts.productId}`);
  };

  return (
    <div className="w-[32rem] h-[25.6rem] m-[2rem]">
      {/* 사진 */}
      <div className="h-[18.4rem] flex" onClick={handlePageProductOptionClick}>
        <div className="w-[15.5rem] bg-gray-10 relative">
          <Image src="/author_thumb.png" alt="메인 웨딩 사진" fill className="object-cover" />
          <button className="absolute top-[15.25rem] left-[12.5rem]" onClick={handleLikeClick}>
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
          </button>
        </div>
        <div className="w-[1rem]"></div>
        <div className="w-[15.5rem] bg-gray-10 py-[1.4rem] px-[1rem] flex flex-col justify-between">
          <InfoItem
            label="원본"
            value={likeProducts.originalProvided}
            booleanText={{ true: '전체 제공', false: '미제공' }}
          />
          <InfoItem label="시간" value={likeProducts.shootingHours} unit="시간" />
          <InfoItem label="장소" value={likeProducts.shootingLocationCount} unit="곳" />
          <InfoItem label="의상" value={likeProducts.costumeCount} unit="벌" />
          <InfoItem label="보정본" value={likeProducts.retouchedCount} unit="장" />
        </div>
      </div>
      <div className="h-[1.1rem]"></div>
      <div className="w-[32rem] h-[6.1rem] flex flex-col gap-[0.9rem]" onClick={handlePageProductClick}>
        <div className="h-auto flex justify-between font-bold text-body2Normal">
          <div className="text-gray-90 flex items-center">
            <span>{likeProducts.studioName}</span>
            <Icon_ChevronDown width={16} height={16} className="rotate-[270deg]" />
          </div>
          <div className="w-[11.2rem] flex justify-end gap-[0.8rem] items-center">
            <div className="text-red-40">{likeProducts.discountRate}%</div>
            <div className="text-common-100">{likeProducts.price.toLocaleString()}원</div>
          </div>
        </div>
        <div className=" text-gray-80 text-body3Normal">{likeProducts.optionName}</div>
        {/* 날짜 옵션 */}
        <div className=" flex gap-[0.5rem] items-center">
          <Icon_Calendar width={14} height={14} />
          <div className="flex gap-[0.6rem] items-center">
            {(likeProducts.shootingSeason as ShootingPeriod[]).map((season, index) => (
              <span
                key={index}
                className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]"
              >
                {SHOOTING_PERIOD_DISPLAY_MAP[season]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
