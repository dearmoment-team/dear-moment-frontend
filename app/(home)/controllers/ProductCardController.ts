import { MainPageProduct } from '@/api/products/types';
import { useState } from 'react';

interface UseProductCardControllerProps {
  mainProduct: MainPageProduct;
}

export function useProductCardController({ mainProduct }: UseProductCardControllerProps) {
  const [isLiked, setIsLiked] = useState(mainProduct.isLiked);

  const onClickHeart = () => {
    setIsLiked(!isLiked);
  };

  return { isLiked, onClickHeart };
}
