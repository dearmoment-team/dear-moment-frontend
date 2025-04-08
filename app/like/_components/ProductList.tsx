import ProductCard from './ProductCard';
import { MainLikeProduct } from '@/api/likes/types';

interface ProductListProps {
  mainLikeProducts: MainLikeProduct[];
  loading: boolean;
  error: string | null;
}

export default function ProductList({ mainLikeProducts = [], loading, error }: ProductListProps) {
  console.log('mainLikeProducts.length', mainLikeProducts.length);
  // 상품이 없을 때 표시할 내용
  if (!mainLikeProducts || mainLikeProducts.length === 0) {
    return <div>좋아요한 상품이 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mainLikeProducts.map((product: MainLikeProduct) => (
        <div key={product.likeId} className="mb-4">
          <ProductCard likeProducts={product} />
        </div>
      ))}
    </div>
  );
}
