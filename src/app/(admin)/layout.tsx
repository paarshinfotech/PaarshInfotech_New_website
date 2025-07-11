import { PropsWithChildren } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

// This layout is specific to the (admin) group and does not include public header/footer
export default function AdminAreaLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-secondary/50">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
