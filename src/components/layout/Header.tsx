"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LuMenu, LuX, LuPhone, LuMail, LuChevronDown } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/excellence-centers", label: "Excellence Centers" },
  { href: "/careers", label: "Careers" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

const NavLink = ({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick?: () => void }) => (
  <Link
    href={href}
    className={cn(
      "relative text-sm font-medium transition-colors text-foreground/60 hover:text-primary",
      isActive && "text-primary"
    )}
    onClick={onClick}
  >
    {label}
    {isActive && (
      <span className="absolute left-0 -bottom-1 block h-[2px] w-full bg-primary" />
    )}
  </Link>
);

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-primary tracking-tight">
            Paarsh Infotech
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} isActive={pathname === link.href} />
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
            <Link href="/quote">Get a Quote</Link>
          </Button>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <LuMenu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background p-0">
            <div className="p-6">
              <Link
                href="/"
                className="mb-8 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-bold text-lg text-primary">
                  Paarsh Infotech
                </span>
              </Link>
              <nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    {...link}
                    isActive={pathname === link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </nav>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/10">
              <Button asChild className="w-full">
                <Link href="/quote" onClick={() => setIsMobileMenuOpen(false)}>
                  Get A Quote
                </Link>
              </Button>
              <div className="text-sm text-center text-foreground/60 mt-4">
                <a href="mailto:info@paarshinfotech.com" className="hover:text-primary">
                  info@paarshinfotech.com
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}