import { AdminLayoutProps } from '../type';
import NavBar from '../_components/NavBar';
import Header from '../_components/Header';

const FormPageLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Header />
      <NavBar />
      <section className="w-full px-[4rem]">{children}</section>
    </>
  );
};

export default FormPageLayout;
