import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { MainLikeProduct } from '@/api/likes/types';
import { searchLikeOptionList } from '@/api/likes';
import { ApiErrorImpl } from '@/api/error';

interface ProductListProps {
  likeProducts: MainLikeProduct[];
  loading: boolean;
  error: string | null;
}

export default function ProductList({ likeProducts, loading, error }: ProductListProps) {
  const [products, setProducts] = useState<MainLikeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [errorMessage, setErrorMessage] = useState<string | null>(error);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await searchLikeOptionList();
      if (response.success && response.data) {
        setProducts(response.data.content);
      } else {
        setErrorMessage('상품 데이터를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('상품 데이터 가져오기 실패:', error);
      if (error instanceof ApiErrorImpl) {
        switch (error.code) {
          case 'NOT_FOUND':
            setErrorMessage('상품 데이터를 찾을 수 없습니다.');
            break;
          case 'UNAUTHORIZED':
            setErrorMessage('인증이 필요합니다.');
            break;
          default:
            setErrorMessage(`오류가 발생했습니다: ${error.message}`);
        }
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!likeProducts || likeProducts.length === 0) {
    return <div>좋아요한 상품이 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {likeProducts.map((product: MainLikeProduct) => (
        <div key={product.likeId} className="mb-4">
          <ProductCard likeProducts={product} />
        </div>
      ))}
    </div>
  );
}
