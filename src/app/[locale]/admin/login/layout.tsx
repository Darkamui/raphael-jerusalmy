import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login - Raphael Jerusalmy',
  description: 'Admin login page'
};

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <>{children}</>;
}