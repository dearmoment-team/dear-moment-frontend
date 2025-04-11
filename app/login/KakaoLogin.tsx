'use client';

import { KakaoLogin } from '@/components/KakaoLogin';

export default function KakaoLoginButton() {
  const goLogin = () => {
    const KAKAO_CLIENT_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_URI;
    
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoUrl;
  };
  return (
    <div onClick={goLogin}>
      <KakaoLogin />
    </div>
  );
}
