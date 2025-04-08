'use client';

import { MainLikeProduct } from '../../api/likes/types';
// import Filtering from '../../(home)/_components/Filtering';
import ProductList from './ProductList';
import { useLikeController } from '../controllers/LikeController';
import { useState } from 'react';
import Tab from './Tab';
import StudioList from './StudioList';

interface ClientFilteringWrapperProps {
  initialLikeProducts: MainLikeProduct[];
  initialError: string | null;
}

export default function ClientFilteringWrapper({ initialLikeProducts, initialError }: ClientFilteringWrapperProps) {
  const [isSelected, setIsSelected] = useState('product');
  const { likeProducts, loading, error, setLikeProducts, setLoading, setError, fetchLikeProductList } =
    useLikeController({
      initialLikeProducts,
      initialError,
    });

  const handleTabSelected = (selected: string) => {
    setIsSelected(selected);
  };

  return (
    <>
      <Tab isSelected={isSelected} onSelect={handleTabSelected}></Tab>
      {/* <Filtering
        setMainProducts={setLikeProducts}
        setLoading={setLoading}
        setError={setError}
        fetchMainProducts={fetchLikeProductList}
      /> */}
      {isSelected === 'product' ? (
        <ProductList mainLikeProducts={likeProducts} loading={loading} error={error} />
      ) : (
        <StudioList />
      )}
    </>
  );
}
