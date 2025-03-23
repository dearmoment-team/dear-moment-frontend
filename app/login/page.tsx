import Image from 'next/image';
import Link from 'next/link';
import { Icon_Logo } from '@/assets/icons';
import { KakaoLogin } from '@/components/KakaoLogin';

export default function LoginPage() {
  return (
    <div className="relative w-[36rem] h-[84.7rem]">
      <Image src="/login.png" alt="메인 웨딩 사진" fill className="object-cover" />
      <div className="absolute flex flex-col z-10 gap-[1.44rem]" style={{ top: '19.2rem', left: '2.3rem' }}>
        <Icon_Logo width={142} height={23} />
        <div className="w-[19.3rem] h-[6.8rem] text-title2 font-bold text-common-0 z-10">
          딱 맞는 웨딩스냅 찾는 가장 쉬운 방법
        </div>
      </div>
      <div className="absolute" style={{ top: '74.7rem', left: '2rem' }}>
        <Link href="/">
          <KakaoLogin />
        </Link>
      </div>
    </div>
  );
}
