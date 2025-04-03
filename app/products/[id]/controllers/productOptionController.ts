import { addOptionLike } from '@/api/likes';
import { ProductOption } from '@/api/products/types';
import { useState } from 'react';

export function useProductOptionController({
  initIsLiked,
  productOption,
}: {
  initIsLiked: boolean;
  productOption: ProductOption;
}) {
  const [isLiked, setIsLiked] = useState(initIsLiked);

  // TODO: 상품 옵션 좋아요 API 연동
  const onClickHeart = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      // TODO: 좋아요 제거 API 호출
      // await removeOptionLike({ optionId: productOption.optionId });
    } else {
      await addOptionLike(productOption.optionId);
    }
  };

  return {
    isLiked,
    onClickHeart,
  };
}
