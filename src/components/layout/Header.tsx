"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground/80"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg text-primary">Paarsh Infotech</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
          <div className="flex items-center space-x-4">
             <div className="text-sm text-foreground/80">
              <div>info@paarshinfotech.com</div>
              <div>+91 12345 67890</div>
            </div>
            <Button asChild>
              <Link href="/quote">Get A Quote</Link>
            </Button>
          </div>
        </div>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <div className="p-4">
              <Link href="/" className="mb-8 flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="font-bold text-lg text-primary">Paarsh Infotech</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
                <Button asChild className="mt-4">
                  <Link href="/quote" onClick={() => setIsMobileMenuOpen(false)}>Get A Quote</Link>
                </Button>
                 <div className="text-sm text-foreground/80 mt-4 border-t pt-4">
                  <div>info@paarshinfotech.com</div>
                  <div>+91 12345 67890</div>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
