'use client';

import { KakaoLogin } from '@/components/KakaoLogin';

export default function KakaoLoginButton() {
  const goLogin = () => {
    const KAKAO_CLIENT_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_URI;
    console.log('process.env.NEXT_PUBLIC_API_BASE_URL', process.env.NEXT_PUBLIC_API_BASE_URL);
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoUrl;
  };
  return (
    <div onClick={goLogin}>
      <KakaoLogin />
    </div>
  );
}
