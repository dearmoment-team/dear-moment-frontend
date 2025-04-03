import ProductDetail from './_components/ProductDetail';
import { getProductDetail } from './actions/products';

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { isLiked?: string };
}) {
  const { id } = await params;
  const { isLiked } = await searchParams;

  // 서버 컴포넌트에서 데이터 페칭
  const { product, error } = await getProductDetail(Number(id));

  // 쿼리 파라미터에서 isLiked 값 가져오기
  const initIsLiked = isLiked === 'true';

  return <ProductDetail initialProduct={product} initialError={error} initIsLiked={initIsLiked} />;
}
