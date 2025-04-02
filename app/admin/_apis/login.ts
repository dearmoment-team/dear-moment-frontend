import { LoginFormDataType } from '../_types/login';

export const login = async ({ loginId, password }: LoginFormDataType) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ loginId, password }),
  });

  if (!response.ok) {
    throw new Error('로그인 실패');
  }

  const data = await response.json();

  const reponseHeader = response.headers.get('Authorization');
  if (!reponseHeader) {
    throw new Error('로그인 토큰 없음');
  }

  const token = reponseHeader?.split(' ')[1];

  return { token, data };
};
