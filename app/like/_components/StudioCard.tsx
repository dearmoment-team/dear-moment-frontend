import { Icon_Heart_Filled, Icon_Calendar, Icon_Heart } from '@/assets/icons';
import { useState } from 'react';
import Image from 'next/image';

export default function ProductCard() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-[32rem] h-[24.7rem] my-[1.4rem] mx-[2rem] flex flex-col space-y-[1.3rem]">
      {/* 작가정보 헤더 */}
      <div className="flex flex-col space-y-[0.8rem]">
        <div>
          <div className="flex items-center gap-[1rem]">
            <div className="w-[2.6rem] h-[2.6rem] rounded-full bg-gray-40" />
            <div className="space-y-[0.8rem] py-[0.7rem]">
              <span className="text-gray-90 text-subtitle2 font-bold">오에브</span>
            </div>
            <button className="ml-auto" onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
            </button>
          </div>
          <div className="flex gap-[0.5rem]">
            <div className="text-gray-80 text-label2 font-semibold bg-red-20 px-[0.8rem] py-[0.45rem]">우아한</div>
            <div className="text-gray-80 text-label2 font-semibold bg-red-20 px-[0.8rem] py-[0.45rem]">빈티지한</div>
          </div>
        </div>
        {/* 가격 */}
        <div className="h-[1.4rem] mb-2 text-body2Normal">
          <span className="text-red-40 font-semibold mr-2">~43%</span>
          <span className="text-common-100 font-semibold">850,000원 ~ 850,000원</span>{' '}
        </div>
        {/* 날짜 옵션 */}
        <div className=" flex gap-[0.5rem] items-center">
          <Icon_Calendar width={14} height={14} />
          <div className="flex gap-[0.6rem] items-center">
            <span className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]">
              25년 상반기
            </span>
            <span className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]">
              25년 상반기
            </span>
          </div>
        </div>
      </div>
      {/* 썸네일 영역 (3장 가로로) */}
      <div className="flex gap-[0.8rem]">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="w-[10.1rem] h-[13.2rem] bg-gray-20" />
        ))}
      </div>
    </div>
  );
}
