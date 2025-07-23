
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { LuMenu, LuX, LuPhone, LuMail } from "react-icons/lu";

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

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !isScrolled && !isMobileMenuOpen;

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive
            ? "text-primary"
            : isTransparent
            ? "text-white hover:text-white/80"
            : "text-foreground/80",
          isMobileMenuOpen && "text-foreground/80"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        isTransparent
          ? "border-transparent bg-transparent"
          : "border-border/40 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/60"
      )}
    >
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span
            className={cn(
              "font-bold text-lg transition-colors",
              isTransparent ? "text-white" : "text-primary"
            )}
          >
            Paarsh Infotech
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <Button
              asChild
              className={cn(
                isTransparent &&
                  "bg-white/90 text-primary hover:bg-white"
              )}
            >
              <Link href="/quote">Get A Quote</Link>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    isTransparent &&
                      "border-white/50 text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  <LuPhone className="h-4 w-4" />
                  <span className="sr-only">Contact Information</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <div className="space-y-4">
                  <a
                    href="mailto:info@paarshinfotech.com"
                    className="flex items-center gap-3 group"
                  >
                    <LuMail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      info@paarshinfotech.com
                    </span>
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-3 group"
                  >
                    <LuPhone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      +91 12345 67890
                    </span>
                  </a>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                isTransparent &&
                  "border-white/50 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              <LuMenu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background">
            <div className="p-4">
              <Link
                href="/"
                className="mb-8 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-bold text-lg text-primary">
                  Paarsh Infotech
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
                <Button asChild className="mt-4">
                  <Link
                    href="/quote"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get A Quote
                  </Link>
                </Button>
                <div className="text-sm text-foreground/80 mt-4 border-t pt-4 space-y-3">
                  <a
                    href="mailto:info@paarshinfotech.com"
                    className="flex items-center gap-2"
                  >
                    <LuMail className="w-4 h-4" />
                    <span>info@paarshinfotech.com</span>
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-2"
                  >
                    <LuPhone className="w-4 h-4" />
                    <span>+91 12345 67890</span>
                  </a>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
