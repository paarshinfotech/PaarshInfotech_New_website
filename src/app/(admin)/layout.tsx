
'use client';

import { PropsWithChildren, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

// This layout is specific to the (admin) group and includes route protection
export default function AdminAreaLayout({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Do not render the sidebar layout for the login page itself
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  if (!isAuthenticated) {
    return null; // Or a loading spinner, since the redirect will happen
  }

  return (
    <div className="flex min-h-screen bg-secondary/50">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
