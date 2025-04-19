'use client';

import NavBar from '../_components/NavBar';
import Header from '../_components/Header';
import { usePathname } from 'next/navigation';
import { AdminLayoutProps } from '../_types/common';

const FormPageLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <Header
        className={
          'fixed left-0 top-0 flex w-full justify-center bg-[#2C2C2C] py-[1rem] text-[2.4rem] font-bold text-white'
        }
      >
        {pathname.includes('studio') ? '스튜디오' : '상품'}
      </Header>
      <NavBar />
      <section className="w-full px-[4rem]">{children}</section>
    </>
  );
};

export default FormPageLayout;
