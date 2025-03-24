import ProductForm from '@/admin/_components/ProductForm';
import ProductPackageOption from '@/admin/_components/ProductPackageOption';
import ProductSingleOption from '@/admin/_components/ProductSingleOption';

const ProductPage = () => {
  return (
    <div className="flex flex-col gap-[6rem] max-w-[90rem] mx-auto my-[5rem]">
      <section>
        <header className="text-[2.4rem] font-semibold text-[#000000] mb-[1rem]">상품</header>
        <ProductForm />
      </section>
      <section>
        <header className="text-[2.4rem] font-semibold text-[#000000] mb-[1rem]">상품 옵션</header>
        단품
        <ProductSingleOption />
        패키지
        <ProductPackageOption />
      </section>
    </div>
  );
};

export default ProductPage;
