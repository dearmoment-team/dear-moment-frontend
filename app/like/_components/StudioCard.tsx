import { Icon_Heart_Filled, Icon_Calendar, Icon_Heart } from '@/assets/icons';
import { useState } from 'react';
import Image from 'next/image';

export default function ProductCard() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-[32rem] h-[24.7rem] m-[2rem] p-[2rem] flex flex-col space-y-[1.3rem]">
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
        <div className="h-[1.4rem] mb-2 text-sm text-body2Normal">
          <span className="text-red-500 font-semibold mr-2">~43%</span>
          <span className="text-gray-900 font-semibold">850,000원 ~ 850,000원</span>{' '}
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

// {/* 상품 카드 리스트 */}
// <div className="space-y-6">
// {[1, 2].map((_, i) => (
//   <div key={i} className="p-4 border border-gray-200 rounded-xl relative">
//     {/* 상단 */}
//     <div className="flex items-center justify-between mb-2">
//       <div className="text-subtitle font-semibold text-gray-900">오예브</div>
//       <button>
//         <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42...z" />
//         </svg>
//       </button>
//     </div>

//     {/* 태그 */}
//     <div className="flex gap-2 mb-2 text-xs font-medium">
//       <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">우아함</span>
//       <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">빈티지함</span>
//     </div>

//     {/* 가격 */}
//     <div className="mb-2 text-sm">
//       <span className="text-red-500 font-semibold mr-2">~43%</span>
//       <span className="text-gray-900 font-semibold">850,000원 ~ 850,000원</span>
//     </div>

//     {/* 시즌 정보 */}
//     <div className="text-xs text-gray-500 flex gap-2 mb-2">
//       <span>25년 하반기</span>
//       <span>25년 하반기</span>
//       <span>26년 상반기</span>
//     </div>

//     {/* 썸네일 영역 (3장 가로로) */}
//     <div className="grid grid-cols-3 gap-2 mt-2">
//       {[1, 2, 3].map((_, i) => (
//         <div key={i} className="w-full aspect-square bg-gray-100 rounded-md" />
//       ))}
//     </div>
//   </div>
// ))}
// </div>

// {/* 상품 카드 리스트 */}
// <div className="space-y-6">
// <div className="p-4 border border-gray-200 rounded-xl relative">
//   {/* 상단 */}
//   <div className="flex items-center justify-between mb-2">
//     <div className="text-subtitle font-semibold text-gray-900">오에브</div>
//     <button>
//       <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42...z" />
//       </svg>
//     </button>
//   </div>

//   {/* 태그 */}
//   <div className="flex gap-2 mb-2 text-xs font-medium">
//     <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">우아함</span>
//     <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">빈티지함</span>
//   </div>

//   {/* 가격 */}
//   <div className="mb-2 text-sm">
//     <span className="text-red-500 font-semibold mr-2">~43%</span>
//     <span className="text-gray-900 font-semibold">850,000원 ~ 850,000원</span>
//   </div>

//   {/* 시즌 정보 */}
//   <div className="text-xs text-gray-500 flex gap-2 mb-2">
//     <span>25년 하반기</span>
//     <span>25년 하반기</span>
//     <span>26년 상반기</span>
//   </div>
