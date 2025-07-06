
import { notFound } from 'next/navigation';

// This page is intentionally left blank to resolve a build issue.
// By calling notFound(), we ensure that any attempt to access a
// service detail page will correctly result in a 404 error without
// breaking the application build.
export default function ServiceSlugPage() {
  notFound();
}
