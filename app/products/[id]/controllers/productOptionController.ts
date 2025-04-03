import { addOptionLike } from '@/api/likes';
import { ProductOption } from '@/api/products/types';
import { useLayoutEffect, useState } from 'react';

// 상품 상세 페이지에서 전달받는 상품 옵션은 CSR로 갱신된 데이터일 수 있음
export function useProductOptionController({ productOption }: { productOption: ProductOption }) {
  const [isLiked, setIsLiked] = useState(productOption.isLiked);

  // productOption.isLiked 값이 변경될 때마다 상태 업데이트
  useLayoutEffect(() => {
    setIsLiked(productOption.isLiked);
  }, [productOption.isLiked]);

  // TODO: 상품 옵션 좋아요 API 연동
  const onClickHeart = async () => {
    if (isLiked) {
      // TODO: 좋아요 제거 API 호출
      // await removeOptionLike({ optionId: productOption.optionId });
      setIsLiked(false);
    } else {
      await addOptionLike(productOption.optionId);
      setIsLiked(true);
    }
  };

  return {
    isLiked,
    onClickHeart,
  };
}
