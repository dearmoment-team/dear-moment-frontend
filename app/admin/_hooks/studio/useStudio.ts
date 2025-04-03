'use client';

import { postStudio } from '@/admin/_services/studio';
import { adminTokenStore } from '@/admin/_stores/adminTokenStore';
import { StudioFormDataType } from '@/admin/_types/studio';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';

export const useStudio = () => {
  const { token } = adminTokenStore();
  const router = useRouter();

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

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'partnerShops',
  });

  const onSubmit = async (data: StudioFormDataType) => {
    try {
      const { data: studioData } = await postStudio({ token, body: data });
      alert('스튜디오 등록에 성공했습니다.');
      router.push(`/admin/studio?id=${studioData.data.id}`);
    } catch (error) {
      console.error(error);
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
