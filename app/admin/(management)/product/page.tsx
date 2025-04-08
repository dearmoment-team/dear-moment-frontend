import ProductForm from '@/admin/_components/ProductForm';

const ProductPage = () => {
  return (
    <div className="mx-auto my-[5rem] flex max-w-[90rem] flex-col gap-[6rem]">
      <header className="mb-[1rem] text-[2.4rem] font-semibold text-[#000000]">상품</header>
      <ProductForm />
    </div>
  );
};

export default ProductPage;
