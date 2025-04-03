'use client';

import { getProfile, login } from '@/admin/_apis/user';
import { adminTokenStore } from '@/admin/_stores/adminTokenStore';
import { LoginFormDataType } from '@/admin/_types/login';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const useLogin = () => {
  const { setToken } = adminTokenStore();
  const router = useRouter();

  const methods = useForm<LoginFormDataType>({
    defaultValues: {
      loginId: '',
      password: '',
    },
  });

  // TODO : 미들웨어 설정으로 토큰값 없을 시 studio, product 못 들어가도록 막기
  const onSubmit = async (data: LoginFormDataType) => {
    try {
      const loginResponse = await login(data);
      setToken(loginResponse.token);

      const { data: userData } = await getProfile(loginResponse.token);
      const studioId = userData.data.studioId;
      const url = studioId ? `/admin/studio?id=${studioId}` : '/admin/studio';
      router.push(url);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...methods,
    onSubmit,
  };
};
