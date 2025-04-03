import { addInquiryOption } from '@/api/inquiries';
import { addOptionLike } from '@/api/likes';
import { ProductOption } from '@/api/products/types';
import { useState } from 'react';

export function useProductOptionController({ initProductOption }: { initProductOption: ProductOption | null }) {
  const [isLiked, setIsLiked] = useState(initProductOption?.isLiked ?? false);

  // 상품 옵션 좋아요 API 연동
  const onClickHeart = async () => {
    try {
      if (!initProductOption) return;

      if (isLiked) {
        // TODO: 좋아요 제거 API 호출
        // await removeOptionLike({ optionId: initProductOption.optionId });
        setIsLiked(false);
      } else {
        await addOptionLike(initProductOption.optionId);
        setIsLiked(true);
      }

      // 세션 스토리지에 좋아요 상태 변경 저장
      sessionStorage.setItem('optionLikeChanged', 'true');
      sessionStorage.setItem('optionId', initProductOption.optionId.toString());

      // 상품 ID도 함께 저장 (상품 상세 페이지에서 필요)
      if (initProductOption.productId) {
        sessionStorage.setItem('productId', initProductOption.productId.toString());
      }
    } catch (error) {
      console.error('옵션 좋아요 액션 실패:', error);
    }
  };

  const onClickInquiry = async () => {
    try {
      if (!initProductOption) return;

      await addInquiryOption({
        productId: initProductOption.productId,
        optionId: initProductOption.optionId,
      });
      alert('문의가 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('옵션 문의 액션 실패:', error);
    }
  };

  return {
    isLiked,
    onClickHeart,
    onClickInquiry,
  };
}
