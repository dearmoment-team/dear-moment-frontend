import { Icon_Logo } from '@/assets/icons';
import Link from 'next/link';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container min-h-screen flex">
      <div>{children}</div>
    </div>
  );
}
