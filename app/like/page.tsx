'use client';

import { useState } from 'react';
import Filtering from '@/(home)/_components/Filtering';
import Tab from '@/like/_components/Tab';
import ProductList from '@/like/_components/ProductList';
import StudioList from '@/like/_components/StudioList';

export default function LikePage() {
  const [isSelected, setIsSelected] = useState('product');
  const handleTabSelected = (selected: string) => {
    setIsSelected(selected);
    console.log('isSelected', isSelected);
  };
  return (
    <div className="space-y-4">
      
      <Tab isSelected={isSelected} onSelect={handleTabSelected}></Tab>
      <Filtering />
      {isSelected === 'product' ? <ProductList /> : <StudioList />}
    </div>
  );
}
