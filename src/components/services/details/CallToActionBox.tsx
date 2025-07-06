import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToActionBox() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Let’s Build Something Great Together
        </h2>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Ready to start your next project with us? Get in touch with our team or request a free quote today.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-primary hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground/50">
            <Link href="/quote">Get Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
