"use client";

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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { FaChartBar, FaHome } from "react-icons/fa";
import {
  LuBriefcase,
  LuFileText,
  LuMenu,
  LuMessageSquare,
  LuPackage,
  LuSettings,
  LuLayers,
  LuRss,
  LuStar,
  LuUsers,
  LuChevronDown,
  LuLogOut,
  LuLoader,
  LuImage,
  LuGraduationCap,
  LuFileQuestion,
  LuMail,
} from "react-icons/lu";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const mainLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FaHome },
  { href: "/admin/about", label: "About", icon: LuFileText },
  { href: "/admin/services", label: "Services", icon: LuBriefcase },
  { href: "/admin/products", label: "Products", icon: LuLayers },
  { href: "/admin/productreview", label: "ProductTestimonial", icon: LuLayers },
  { href: "/admin/clients", label: "Clients", icon: LuPackage },
  { href: "/admin/media", label: "Media", icon: LuImage },
  { href: "/admin/testimonial", label: "Testimonials", icon: LuPackage },
  { href: "/admin/site-images", label: "Site Images", icon: LuImage },
  { href: "/admin/social", label: "Social Posts", icon: LuRss },
  { href: "/admin/contacts", label: "Contacts", icon: LuMessageSquare },
  { href: "/admin/quotes", label: "Quotes", icon: LuFileQuestion },
  { href: "/admin/feedback", label: "Feedback", icon: LuStar },
  { href: "/admin/analytics", label: "Analytics", icon: FaChartBar },
  { href: "/admin/newsletter", label: "Newsletter", icon: LuMail },
];

const teamLinks = [
  { href: "/admin/team", label: "Members" },
  { href: "/admin/team/categories", label: "Categories" },
];

const careerLinks = [
  { href: "/admin/careers", label: "Job Openings" },
  { href: "/admin/careers/media", label: "Media" },
  { href: "/admin/careers/testimonials", label: "Testimonials" },
];

const excellenceCenterLinks = [
  { href: "/admin/excellence-center", label: "Dashboard" },
  { href: "/admin/excellence-center/partners", label: "Partners" },
  { href: "/admin/excellence-center/programs", label: "Programs Offered" },
  { href: "/admin/excellence-center/centers", label: "Centers" },
  { href: "/admin/excellence-center/gallery", label: "Gallery" },
  { href: "/admin/excellence-center/journey", label: "Journey" },
  { href: "/admin/excellence-center/workshops", label: "Workshops" },
  { href: "/admin/excellence-center/awards", label: "Awards" },
  { href: "/admin/excellence-center/feedbacks", label: "Feedbacks" },
];

const internshipLinks = [
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/internship-settings", label: "Settings" },
];

const settingsLink = {
  href: "/admin/settings",
  label: "Settings",
  icon: LuSettings,
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isTeamSectionOpen = pathname.startsWith("/admin/team");
  const isCareerSectionOpen = pathname.startsWith("/admin/careers");
  const isExcellenceCenterSectionOpen = pathname.startsWith("/admin/excellence-center");
  const isInternshipSectionOpen = pathname.startsWith("/admin/registrations") || pathname.startsWith("/admin/internship-settings");

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      toast({
        title: "Logged Out Successfully",
        description: "You have been logged out of the admin panel.",
      });
      router.push('/admin/login');
      setIsLoggingOut(false);
    }, 1000);
  };

  const NavLink = ({
    href,
    label,
    icon: Icon,
    isSubItem = false,
  }: {
    href: string;
    label: string;
    icon?: React.ElementType;
    isSubItem?: boolean;
  }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className="block">
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn("w-full justify-start", isSubItem && "pl-10")}
        >
          {Icon && <Icon className="mr-2 h-4 w-4" />}
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
          <NavLink {...mainLinks.find((l) => l.label === "Dashboard")!} />

          <Collapsible defaultOpen={isTeamSectionOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <LuUsers className="h-4 w-4" /> Team
                </span>
                <LuChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-1">
              {teamLinks.map((link) => (
                <NavLink key={link.href} {...link} isSubItem />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible defaultOpen={isCareerSectionOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <LuBriefcase className="h-4 w-4" /> Careers
                </span>
                <LuChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-1">
              {careerLinks.map((link) => (
                <NavLink key={link.href} {...link} isSubItem />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible defaultOpen={isExcellenceCenterSectionOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <LuGraduationCap className="h-4 w-4" /> Excellence Center
                </span>
                <LuChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-1">
              {excellenceCenterLinks.map((link) => (
                <NavLink key={link.href} {...link} isSubItem />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible defaultOpen={isInternshipSectionOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <LuFileText className="h-4 w-4" /> Internship
                </span>
                <LuChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-1">
              {internshipLinks.map((link) => (
                <NavLink key={link.href} {...link} isSubItem />
              ))}
            </CollapsibleContent>
          </Collapsible>

          {mainLinks
            .filter((l) => l.label !== "Dashboard")
            .map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-2 border-t">
        <NavLink {...settingsLink} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <LuLogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will be returned to the login page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut && (
                  <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:flex flex-col w-64 border-r bg-background">
        <SidebarContent />
      </div>
      <div className="lg:hidden absolute top-4 left-4 z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <LuMenu className="h-5 w-5" />
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
