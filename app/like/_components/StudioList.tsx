import { useEffect, useState } from 'react';
import { MainLikeStudio } from '@/api/likes/types';
import { searchLikeStudioList } from '@/api/likes';
import { ApiErrorImpl } from '@/api/error';
import StudioCard from './StudioCard';

interface StudioListProps {
  likeStudios: MainLikeStudio[];
  loading: boolean;
  error: string | null;
}

export default function StudioList({ likeStudios, loading, error }: StudioListProps) {
  const [studios, setStudios] = useState<MainLikeStudio[]>([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [errorMessage, setErrorMessage] = useState<string | null>(error);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const fetchStudios = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await searchLikeStudioList();
      if (response.success && response.data) {
        setStudios(response.data.content);
      } else {
        setErrorMessage('스튜디오 데이터를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('스튜디오 데이터 가져오기 실패:', error);
      if (error instanceof ApiErrorImpl) {
        switch (error.code) {
          case 'NOT_FOUND':
            setErrorMessage('스튜디오 데이터를 찾을 수 없습니다.');
            break;
          case 'UNAUTHORIZED':
            setErrorMessage('인증이 필요합니다.');
            break;
          default:
            setErrorMessage(`오류가 발생했습니다: ${error.message}`);
        }
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!likeStudios || likeStudios.length === 0) {
    return <div>좋아요한 스튜디오가 없습니다.</div>;
  }

  return (
    <div>
      {likeStudios.map((studio: MainLikeStudio) => (
        <div key={studio.likeId} className="mb-4">
          <StudioCard likeStudios={studio} />
        </div>
      ))}
    </div>
  );
}
