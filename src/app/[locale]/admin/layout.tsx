import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Raphael Jerusalmy",
  description: "Admin dashboard for managing content",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="fixed inset-0 bg-gray-50 overflow-auto mt-24">
      {children}
    </div>
  );
}
