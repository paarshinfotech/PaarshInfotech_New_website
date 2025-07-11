// This file acts as a catch-all to redirect from /admin to /admin/dashboard
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  redirect('/admin/dashboard');
}
