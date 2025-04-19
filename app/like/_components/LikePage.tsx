'use client';

import { MainLikeProduct, MainLikeStudio } from '@/api/likes/types';
import ProductList from './ProductList';
import { useLikeController } from '../controllers/LikeController';
import { useState } from 'react';
import Tab from './Tab';
import StudioList from './StudioList';

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
  const { likeProducts, likeStudios, loading, error } = useLikeController({
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
        <ProductList likeProducts={likeProducts} loading={loading} error={error} />
      ) : (
        <StudioList likeStudios={likeStudios} loading={loading} error={error} />
      )}
    </>
  );
}
