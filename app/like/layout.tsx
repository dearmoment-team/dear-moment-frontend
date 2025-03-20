import { NavigationBar } from '@/components/NavigationBar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container min-h-screen flex flex-col">
      <header className="py-[1.5rem] px-[2rem]"></header>

      <div className="flex-1">{children}</div>

      <NavigationBar />
    </div>
  );
}
