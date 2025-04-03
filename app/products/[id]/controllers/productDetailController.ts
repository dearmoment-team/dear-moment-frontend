import { addProductLike } from '@/api/likes';
import { fetchProductDetail } from '@/api/products';
import { Product } from '@/api/products/types';
import { useEffect, useState } from 'react';

export function useProductDetailController({
  initIsLiked,
  initProduct,
}: {
  initIsLiked: boolean;
  initProduct: Product | null;
}) {
  const [currentProduct, setCurrentProduct] = useState(initProduct);
  const [isLiked, setIsLiked] = useState(initIsLiked);
  const [isOpenInquiry, setIsOpenInquiry] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // 상품 데이터 다시 가져오기
  const refreshProductData = async () => {
    if (!currentProduct) return;

    try {
      const { data: refreshedProduct } = await fetchProductDetail(currentProduct.productId);

      if (refreshedProduct) {
        setCurrentProduct(refreshedProduct);

        // TODO: product에도 likeId 추가되면 상품 좋아요 상태 변경
        // setIsLiked(refreshedProduct.isLiked || hasLikedOptions);
      }
    } catch (error) {
      console.error('상품 데이터 가져오기 실패:', error);
    }
  };

  // NOTE: 옵션 좋아요 상태값 최신화를 위해 mount 시 refech -> TODO: 추후 호출 로직 개선해보기
  useEffect(() => {
    refreshProductData();
  }, []);

  const onClickHeart = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      // TODO: 좋아요 제거 API 호출
      // await removeLike({ likeId: mainProduct.productId, productId: mainProduct.productId });
    } else {
      if (!currentProduct) return;
      await addProductLike(currentProduct.productId);
    }
  };

  const onSelectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const onResetImage = () => {
    setSelectedImageIndex(null);
  };

  return {
    product: currentProduct,
    isLiked,
    onClickHeart,
    isOpenInquiry,
    selectedImageIndex,
    setIsOpenInquiry,
    onSelectImage,
    onResetImage,
  };
}
