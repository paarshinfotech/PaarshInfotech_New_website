
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

const NavLink = ({
  href,
  label,
  isActive,
  isScrolled,
  onClick,
  isMobile = false,
}: {
  href: string;
  label: string;
  isActive: boolean;
  isScrolled: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}) => (
  <motion.div
    whileHover={{
      scale: 1.05,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      href={href}
      className={cn(
        "relative text-base font-semibold transition-colors duration-300",
        isMobile ? "text-xl py-3 block text-foreground" : "px-4 py-2",
        isActive
          ? isScrolled
            ? "text-primary"
            : "text-primary"
          : isScrolled
          ? "text-muted-foreground"
          : "text-primary/80 hover:text-primary"
      )}
      onClick={onClick}
    >
      {label}
      {isActive && !isMobile && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          layoutId="active-nav"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  </motion.div>
);

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial render
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-white backdrop-blur-md border-gray-200 shadow-sm"
          : "bg-white border-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{
            scale: 1.08,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="flex items-center space-x-3">
            <img
              className="h-16 w-auto"
              src="/uploads/paarsh-infotech-6 (1).png"
              alt="Paarsh Infotech"
            />
          </Link>
        </motion.div>

        <nav className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <NavLink
                {...link}
                isActive={pathname === link.href}
                isScrolled={isScrolled}
              />
            </motion.div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 15px 30px -5px rgba(59, 130, 246, 0.4), 0 10px 15px -5px rgba(59, 130, 246, 0.3)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size="sm"
              className={cn(
                "rounded-md px-4 py-1 text-base font-bold shadow-lg hover:shadow-xl transition-all",
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-primary text-white hover:bg-gray-100 hover:text-primary"
              )}
            >
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </motion.div>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-16 w-16 rounded-full"
              >
                <LuMenu
                  className={cn(
                    "h-12 w-12",
                    isScrolled ? "text-gray-700" : "text-primary"
                  )}
                />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </motion.div>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] p-0 bg-background">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-200">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img
                    className="h-12 w-auto"
                    src="/uploads/paarsh-infotech-6 (1).png"
                    alt="Paarsh Infotech"
                  />
                </Link>
              </div>

              <nav className="flex-1 p-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <NavLink
                        {...link}
                        isActive={pathname === link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        isMobile={true}
                        isScrolled={true}
                      />
                    </motion.div>
                  ))}
                </div>
              </nav>

              <div className="p-6 border-t border-gray-200">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/quote">Get a Quote</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
