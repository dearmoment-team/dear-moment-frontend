'use client';

import { Icon_Logo } from '@/assets/icons';
import KakaoLogin from '@/login/KakaoLogin';
import LoginBackground from '@/assets/login.svg';

export default function LoginPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* <img src="/login.svg" alt="메인 웨딩 사진" className="w-full h-auto object-cover" /> */}
      {/* <LoginBackground className="absolute inset-0 w-full h-full object-cover z-0" /> */}
      {/* <LoginBackground className="absolute inset-0 w-full h-full blur-sm opacity-50" /> */}
      <div className="absolute flex flex-col z-10 gap-6 top-[20%] left-6">
        <Icon_Logo width={142} height={23} />
        <div className="max-w-[80%] text-title2 font-bold text-white">딱 맞는 웨딩스냅 찾는 가장 쉬운 방법</div>
      </div>
      <div className="absolute bottom-8 left-6 z-10">
        <KakaoLogin />
      </div>
    </div>
  );
}
