import { addProductLike } from '@/api/likes';
import { Product } from '@/api/products/types';
import { useState } from 'react';

export function useProductDetailController({
  initIsLiked,
  product,
}: {
  initIsLiked: boolean;
  product: Product | null;
}) {
  const [isLiked, setIsLiked] = useState(initIsLiked);
  const [isOpenInquiry, setIsOpenInquiry] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const onClickHeart = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      // TODO: 좋아요 제거 API 호출
      // await removeLike({ likeId: mainProduct.productId, productId: mainProduct.productId });
    } else {
      if (!product) return;
      await addProductLike(product.productId);
    }
  };

  const onSelectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const onResetImage = () => {
    setSelectedImageIndex(null);
  };

  return {
    isLiked,
    onClickHeart,
    isOpenInquiry,
    selectedImageIndex,
    setIsOpenInquiry,
    onSelectImage,
    onResetImage,
  };
}
