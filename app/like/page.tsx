import LikeHome from './_components/LikePage';
import { getMainLikeProducts } from './actions/like';

export default async function LikeMainPage() {
  const { products, error } = await getMainLikeProducts();
  return (
    <div className="space-y-4">
      <LikeHome initialLikeProducts={products} initialError={error} />
    </div>
  );
}
