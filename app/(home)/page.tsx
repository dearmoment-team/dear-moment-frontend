'use client';

import { useEffect, useState } from 'react';
import { fetchMainPageProducts } from '../api';
import { ApiErrorImpl } from '../api/error';
import { MainPageProduct } from '../api/products/types';
import AuthorList from './_components/AuthorList';
import Filtering from './_components/Filtering';

export default function HomePage() {
  const [mainProducts, setMainProducts] = useState<MainPageProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 메인 페이지 상품 목록 가져오기
  const fetchMainProducts = async (pageNumber: number = 0) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchMainPageProducts(pageNumber, 10);

      // API 응답 구조 변경에 따른 처리
      if (response.success && response.data) {
        setMainProducts(response.data.content);
        console.log('메인 페이지 상품 데이터:', response);
      } else {
        setError('상품 데이터를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('상품 데이터 가져오기 실패:', error);

      // 에러 유형에 따른 처리
      if (error instanceof ApiErrorImpl) {
        switch (error.code) {
          case 'NOT_FOUND':
            setError('상품 데이터를 찾을 수 없습니다.');
            break;
          case 'UNAUTHORIZED':
            setError('인증이 필요합니다.');
            break;
          default:
            setError(`오류가 발생했습니다: ${error.message}`);
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMainProducts();
  }, []);

  return (
    <main className="space-y-4">
      <Filtering
        setMainProducts={setMainProducts}
        setLoading={setLoading}
        setError={setError}
        fetchMainProducts={fetchMainProducts}
      />

      <AuthorList mainProducts={mainProducts} loading={loading} error={error} />
    </main>
  );
}
