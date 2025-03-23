'use client';

import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 flex justify-center py-[1rem] text-[2.4rem] font-bold text-white bg-[#2C2C2C] w-full">
      {/* TODO : 스튜디오 or 상품 수정 시 헤더 명을 ~~수정으로 바꿔줘야 함. 쿼리 스트링 사용해서 등록인지 수정인지 구분 필요. (정보 id 같은 걸 쿼리 스트링으로 넣으면 될듯) */}
      {pathname.includes('studio') ? '스튜디오 등록' : '상품 등록'}
    </header>
  );
};

export default Header;
