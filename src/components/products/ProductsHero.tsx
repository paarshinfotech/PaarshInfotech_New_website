import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LuArrowRight,
  LuLayers,
  LuBriefcase,
  LuUsers,
  LuGraduationCap,
  LuUser,
} from "react-icons/lu";

export default function ProductsHero() {
  return (
    <section className="relative py-24 md:py-36 bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative container text-center max-w-4xl z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
          A Suite of Solutions to Power Your Business
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80">
          From customer relationships to internal operations, our products are
          designed to streamline your workflow, boost productivity, and drive
          growth.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#products">
              Explore Products
              <LuArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/quote">Request a Demo</Link>
          </Button>
        </div>
        <div className="mt-16 flex justify-center gap-8 items-center text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <LuUsers className="w-5 h-5 text-primary" />
            <span>Paarsh CRM</span>
          </div>
          <div className="flex items-center gap-2">
            <LuBriefcase className="w-5 h-5 text-primary" />
            <span>Paarsh HRMS</span>
          </div>
          <div className="flex items-center gap-2">
            <LuLayers className="w-5 h-5 text-primary" />
            <span>Paarsh ERP</span>
          </div>
          <div className="flex items-center gap-2">
            <LuGraduationCap className="w-5 h-5 text-primary" />
            <span>Paarsh E-Learn</span>
          </div>
        </div>
      </div>
    </section>
  );
}
