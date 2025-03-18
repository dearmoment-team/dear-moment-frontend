import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminPage = () => {
  return (
    <section className="flex flex-col items-center gap-4">
      <header className="text-title2 tracking-normal font-semibold">백오피스 로그인</header>
      <Input />
      <Input />
      <Button>로그인</Button>
    </section>
  );
};

export default AdminPage;
