
"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  BarChart2,
  Briefcase,
  FileText,
  Home,
  Menu,
  MessageSquare,
  Package,
  Settings,
  Users,
  Image as ImageIcon,
  LogOut,
  Loader2,
  Rss
} from "lucide-react";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/clients", label: "Clients", icon: Package },
  { href: "/admin/careers", label: "Careers", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/social", label: "Social Posts", icon: Rss },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
];

const settingsLink = { href: "/admin/settings", label: "Settings", icon: Settings };

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate API call for logout
    setTimeout(() => {
        router.push('/admin/login');
        setIsLoggingOut(false);
    }, 1500)
  }

  const NavLink = ({ href, label, icon: Icon }: typeof navLinks[0]) => {
    const isActive = pathname.startsWith(href) && (href !== '/admin/dashboard' || pathname === '/admin/dashboard');
    return (
      <Link href={href} legacyBehavior passHref>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </Link>
    );
  };
  
  const SidebarContent = () => (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        <ScrollArea className="flex-1">
          <nav className="px-2 py-4 space-y-1">
              {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
              ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-2 border-t">
             <NavLink {...settingsLink} />
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be returned to the login page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut}>
                             {isLoggingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
             </AlertDialog>
        </div>
    </div>
  )

  return (
    <>
      <div className="hidden lg:flex flex-col w-64 border-r bg-background">
        <SidebarContent />
      </div>
      <div className="lg:hidden absolute top-4 left-4 z-10">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
                <SidebarContent />
            </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
