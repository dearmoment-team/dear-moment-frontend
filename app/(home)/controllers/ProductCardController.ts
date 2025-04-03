import { addProductLike } from '@/api/likes';
import { MainPageProduct } from '@/api/products/types';
import { useState } from 'react';

interface UseProductCardControllerProps {
  mainProduct: MainPageProduct;
}

export function useProductCardController({ mainProduct }: UseProductCardControllerProps) {
  // TODO: likeId(number)를 통해 상태값 boolean 관리
  const [isLiked, setIsLiked] = useState(mainProduct.isLiked);

  const onClickHeart = async () => {
    if (isLiked) {
      // TODO: 좋아요 제거 API 호출
      // await removeLike({ likeId: mainProduct.productId, productId: mainProduct.productId });
      setIsLiked(false);
    } else {
      await addProductLike(mainProduct.productId);
      setIsLiked(true);
    }
  };

  return { isLiked, onClickHeart };
}
