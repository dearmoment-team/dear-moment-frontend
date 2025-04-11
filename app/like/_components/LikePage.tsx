'use client';

import { MainLikeProduct, MainLikeStudio } from '@/api/likes/types';
import ProductList from './ProductList';
import { useLikeController } from '../controllers/LikeController';
import { useState } from 'react';
import Tab from './Tab';
import StudioList from './StudioList';
import Filtering from '@/like/_components/Filtering/Filtering';

interface ClientFilteringWrapperProps {
  initialLikeProducts: MainLikeProduct[];
  initialLikeStudios: MainLikeStudio[];
  initialError: string | null;
  initialLoading: boolean;
}

export default function ClientFilteringWrapper({
  initialLikeProducts,
  initialLikeStudios,
  initialError,
  initialLoading,
}: ClientFilteringWrapperProps) {
  const [isSelected, setIsSelected] = useState('product');
  const {
    likeProducts,
    likeStudios,
    error,
    likeProductLoading,
    likeStudioLoading,
    setLikeProducts,
    setLikeStudios,
    setLikeProductLoading,
    setLikeStudioLoading,
    fetchLikeProductList,
    fetchLikeStudioList,
    setError,
  } = useLikeController({
    initialLikeProducts,
    initialLikeStudios,
    initialError,
    initialLoading,
  });

  const handleTabSelected = (selected: string) => {
    setIsSelected(selected);
  };

  return (
    <>
      <Tab isSelected={isSelected} onSelect={handleTabSelected} />
      {isSelected === 'product' ? (
        <div>
          <Filtering<MainLikeProduct>
            setMainProducts={setLikeProducts}
            setLoading={setLikeProductLoading}
            setError={setError}
            fetchMainProducts={fetchLikeProductList}
          />
          <ProductList likeProducts={likeProducts} loading={likeProductLoading} error={error} />
        </div>
      ) : (
        <div>
          <Filtering<MainLikeStudio>
            setMainProducts={setLikeStudios}
            setLoading={setLikeStudioLoading}
            setError={setError}
            fetchMainProducts={fetchLikeStudioList}
          />
          <StudioList likeStudios={likeStudios} loading={likeStudioLoading} error={error} />
        </div>
      )}
    </>
  );
}
