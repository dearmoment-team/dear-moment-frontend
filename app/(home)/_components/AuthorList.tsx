import { MainPageProduct } from '@/api/products/types';
import AuthorCard from './AuthorCard';

interface AuthorListProps {
  mainProducts?: MainPageProduct[];
  loading?: boolean;
  error?: string | null;
}

export default function AuthorList({ mainProducts = [], loading, error }: AuthorListProps) {
  return (
    <section className="px-[2rem]">
      <p className="text-body1Normal font-bold text-gray-90 mt-[2.4rem] mb-[2rem]">지금 가장 HOT한 스냅 작가!</p>

      {loading && <div className="text-center py-4">로딩 중...</div>}

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}
      <ul className="space-y-[1.7rem]">
        {mainProducts.map((mainProduct, index) => (
          <li
            key={mainProduct.productId}
            className="w-full"
            style={{
              marginBottom: index === mainProducts.length - 1 ? '2rem' : undefined,
            }}
          >
            <AuthorCard isFirst={index === 0} mainProduct={mainProduct} />
          </li>
        ))}
      </ul>
    </section>
  );
}
