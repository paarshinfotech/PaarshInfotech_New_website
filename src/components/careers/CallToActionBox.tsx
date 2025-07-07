import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToActionBox() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Ready to Start Your Journey?
        </h2>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          We are always looking for passionate and talented individuals to join our team. Explore our openings and take the next step in your career.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="#openings">
              View Openings
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
           <Button asChild size="lg" variant="outline" className="bg-primary hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground/50">
            <Link href="/contact">Contact HR</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
