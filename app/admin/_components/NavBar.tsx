'use client';

import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { studioIdStore } from '../_stores/studioIdStore';
import { adminTokenStore } from '../_stores/adminTokenStore';

const NavBar = () => {
  const { token } = adminTokenStore();
  const { studioId } = studioIdStore();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="mt-[10rem]">
      <nav className="top-[0.9rem] flex h-[5.3rem] w-[100vw] bg-[#E2DEDE] text-[#0B0B0B]">
        <section
          onClick={() => {
            if (studioId) {
              router.push(`/admin/studio?studioId=${studioId}`);
            } else {
              router.push('/admin/studio');
            }
          }}
          className={clsx(
            'flex w-[15.1rem] cursor-pointer items-center justify-center text-[1.4rem] font-semibold',
            pathname.includes('studio') && 'bg-[#4D4242] text-[#FFFFFF]'
          )}
        >
          스튜디오 관리
        </section>
        <section
          onClick={() => {
            if (token && studioId) {
              router.push(`/admin/product?studioId=${studioId}`);
            } else {
              alert('로그인 후, 상품 관리가 가능합니다.');
            }
          }}
          className={clsx(
            'flex w-[15.1rem] cursor-pointer items-center justify-center text-[1.4rem] font-semibold',
            pathname.includes('product') && 'bg-[#4D4242] text-[#FFFFFF]'
          )}
        >
          상품 관리
        </section>
      </nav>
    </div>
  );
};

export default NavBar;
