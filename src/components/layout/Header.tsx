
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

const NavLink = ({ href, label, isActive, isScrolled, onClick }: { href: string; label:string; isActive: boolean; isScrolled: boolean; onClick?: () => void }) => (
  <Link
    href={href}
    className={cn(
      "relative text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-primary" : isScrolled ? "text-foreground/60" : "text-white",
      isActive && isScrolled && "text-primary",
      isActive && !isScrolled && "text-primary"
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md h-16"
          : "bg-transparent h-20"
      )}
    >
      <div className="container flex h-full max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className={cn(
              "font-bold text-xl tracking-tight transition-colors",
              isScrolled ? "text-primary" : "text-white"
          )}>
            Paarsh Infotech
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} isActive={pathname === link.href} isScrolled={isScrolled} />
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button asChild className={cn(
            "rounded-full px-6 transition-all",
            isScrolled ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-white/90 hover:bg-white text-primary"
          )}>
            <Link href="/quote">Get a Quote</Link>
          </Button>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className={cn(isScrolled ? "text-primary" : "text-white border-white/50 bg-transparent hover:bg-white/10 hover:text-white")}>
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
                   <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
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
