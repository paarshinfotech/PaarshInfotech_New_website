
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
  onClick,
  isMobile = false
}: { 
  href: string; 
  label: string; 
  isActive: boolean; 
  onClick?: () => void;
  isMobile?: boolean;
}) => (
  <motion.div
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      href={href}
      className={cn(
        "relative text-base font-semibold transition-all duration-300",
        isMobile ? "text-xl py-3 block" : "px-4 py-2",
        isActive 
          ? "text-blue-600" 
          : "text-gray-700 hover:text-blue-600"
      )}
      onClick={onClick}
    >
      {label}
      {isActive && !isMobile && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-gray-200 shadow-lg" 
          : "bg-white/80 backdrop-blur-sm border-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ 
            scale: 1.08,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="flex items-center space-x-3">
            <img
              className="h-14 w-auto"
              src="/uploads/paarsh-infotech-6 (1).png"
              alt="Paarsh Infotech"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
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
              />
            </motion.div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.4), 0 10px 15px -5px rgba(59, 130, 246, 0.3)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              asChild 
              size="sm" 
              className="rounded-md px-4 py-1 text-base font-bold bg-gradient-to-r from-blue-900 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/quote">
                Get a Quote
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                {isMobileMenuOpen ? (
                  <LuX className="h-6 w-6 text-gray-700" />
                ) : (
                  <LuMenu className="h-6 w-6 text-gray-700" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </motion.div>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-[300px] p-0 bg-white">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-200">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Paarsh Infotech
                  </span>
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
                    className="w-full rounded-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/quote">
                      Get a Quote
                    </Link>
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
