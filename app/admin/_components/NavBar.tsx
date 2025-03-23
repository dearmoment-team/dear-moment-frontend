'use client';

import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="mt-[10rem]">
      <nav className="flex top-[0.9rem] w-[100vw] h-[5.3rem] text-[#0B0B0B] bg-[#E2DEDE]">
        <section
          onClick={() => router.push('/admin/studio')}
          className={clsx(
            'w-[15.1rem] font-semibold text-[1.4rem] flex justify-center items-center cursor-pointer',
            pathname.includes('studio') && 'bg-[#4D4242] text-[#FFFFFF]'
          )}
        >
          스튜디오 관리
        </section>
        <section
          onClick={() => router.push('/admin/product')}
          className={clsx(
            'w-[15.1rem] font-semibold text-[1.4rem] flex justify-center items-center cursor-pointer',
            pathname.includes('product') && 'bg-[#4D4242] text-[#FFFFFF]'
          )}
        >
          상품 관리 관리
        </section>
      </nav>
    </div>
  );
};

export default NavBar;
