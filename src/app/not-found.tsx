import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <h1 className="text-6xl md:text-9xl font-extrabold text-primary">404</h1>
      <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-foreground">Page Not Found</h2>
      <p className="mt-2 text-base md:text-lg text-muted-foreground">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}
