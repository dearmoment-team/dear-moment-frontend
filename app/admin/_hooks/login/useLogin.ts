'use client';

import { login } from '@/admin/_apis/login';
import { adminTokenStore } from '@/admin/_stores/tokenStore';
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

  const onSubmit = async (data: LoginFormDataType) => {
    try {
      await login(data).then(res => setToken(res.token));
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
