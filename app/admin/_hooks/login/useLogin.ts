'use client';

import { getProfile, login } from '@/admin/_apis/user';
import { adminTokenStore } from '@/admin/_stores/adminTokenStore';
import { LoginFormDataType } from '@/admin/_types/login';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const useLogin = () => {
  const { token, setToken } = adminTokenStore();
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
      await login(data).then(res => setToken(res.token));
      await getProfile(token);
      // TODO : studioId 값 유무에 따라 쿼리 스트링 추가
      router.push('/admin/studio');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...methods,
    onSubmit,
  };
};
