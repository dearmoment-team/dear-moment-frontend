import { StudioFormDataType } from '@/admin/_types/studio';

export const postStudio = async ({ token, body }: { token: string; body: StudioFormDataType }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/studios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...body }),
  });

  if (!response.ok) {
    throw new Error('스튜디오 등록 실패');
  }

  const data = await response.json();

  return { data };
};
