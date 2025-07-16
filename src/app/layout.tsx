
"use client"

// This is the root layout that is not part of any route group
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteSettingsProvider } from '@/hooks/useSiteSettings';

// Metadata cannot be exported from a client component.
// We can define it here, but it won't be applied through this client component.
// For metadata, you would typically have a separate layout.tsx for the root.
// However, for this project structure, we will keep it simple.

// export const metadata: Metadata = {
//   title: 'Paarsh Infotech Hub',
//   description: 'Best Software Development Company in Nashik',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
       <head>
        <title>Paarsh Infotech Hub</title>
        <meta name="description" content="Best Software Development Company in Nashik" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body bg-background text-foreground antialiased flex flex-col min-h-screen')}>
        <SiteSettingsProvider>
            {children}
            <Toaster />
        </SiteSettingsProvider>
      </body>
    </html>
  );
