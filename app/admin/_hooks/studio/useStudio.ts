'use client';

import { getStudio, patchStudio, postStudio } from '@/admin/_services/studio';
import { adminTokenStore } from '@/admin/_stores/adminTokenStore';
import { StudioFormDataType } from '@/admin/_types/studio';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export const useStudio = () => {
  const { token } = adminTokenStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const studioId = searchParams.get('id');

  const methods = useForm<StudioFormDataType>({
    defaultValues: {
      status: 'ACTIVE',
      isCasted: true,
      name: '',
      contact: '',
      studioIntro: '',
      artistsIntro: '',
      instagramUrl: '',
      kakaoChannelUrl: '',
      reservationNotice: '',
      cancellationPolicy: '',
      partnerShops: [
        {
          category: undefined,
          name: '',
          urlLink: '',
        },
      ],
    },
  });

  const { reset, control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'partnerShops',
  });

  useEffect(() => {
    const fetchStudio = async () => {
      if (!studioId) return;
      try {
        const { data: responseData } = await getStudio(token, studioId);
        reset({ ...responseData.data, isCasted: responseData.data.isCasted === 'true' });
      } catch (error) {
        console.error('스튜디오 불러오기 실패:', error);
      }
    };

    fetchStudio();
  }, [studioId, reset, token]);

  const onSubmit = async (data: StudioFormDataType) => {
    if (!studioId) {
      try {
        const { data: studioData } = await postStudio({ token, body: { ...data, isCasted: data.isCasted === 'true' } });
        alert('스튜디오 등록에 성공했습니다.');

        router.push(`/admin/studio?studioId=${studioData.data.id}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data: studioIdData } = await patchStudio({
          token,
          body: { ...data, isCasted: data.isCasted === 'true' },
          studioId,
        });
        alert('스튜디오 수정에 성공했습니다.');
        router.push(`/admin/studio?studioId=${studioIdData.data.id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    ...methods,
    onSubmit,
    fields,
    append,
    remove,
  };
};
