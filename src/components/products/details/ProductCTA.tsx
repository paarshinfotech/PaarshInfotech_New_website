import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function ProductCTA() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Ready to See the Difference?
        </h2>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Schedule a personalized demo with one of our product experts to see exactly how we can help you achieve your business goals.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/quote">
              Request a Demo
              <LuArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-primary hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground/50">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
