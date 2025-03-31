import { MainPageProduct } from '@/api/products/types';
import { useState } from 'react';

interface UseAuthorCardControllerProps {
  mainProduct: MainPageProduct;
}

export function useAuthorCardController({ mainProduct }: UseAuthorCardControllerProps) {
  const [isLiked, setIsLiked] = useState(mainProduct.isLiked);

  const onClickHeart = () => {
    setIsLiked(!isLiked);
  };

  return { isLiked, onClickHeart };
}
