import { addOptionLike } from '@/api/likes';
import { ProductOption } from '@/api/products/types';
import { useState } from 'react';

export function useProductOptionController({ initProductOption }: { initProductOption: ProductOption | null }) {
  const [isLiked, setIsLiked] = useState(initProductOption?.isLiked ?? false);

  // TODO: 상품 옵션 좋아요 API 연동
  const onClickHeart = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      // TODO: 좋아요 제거 API 호출
      // await removeOptionLike({ optionId: initProductOption.optionId });
    } else {
      if (!initProductOption) return;
      await addOptionLike(initProductOption.optionId);
    }
  };

  return {
    isLiked,
    onClickHeart,
  };
}
