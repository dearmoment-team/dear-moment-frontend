import ClientWrapper from './_components/ClientWrapper';
import { getMainProducts } from './actions/products';

export default async function HomePage() {
  // 서버 컴포넌트에서 데이터 페칭
  const { products, error } = await getMainProducts();

  return (
    <main className="space-y-4">
      <ClientWrapper initialProducts={products} initialError={error} />
    </main>
  );
}
