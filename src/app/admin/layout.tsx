
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-secondary/50">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
