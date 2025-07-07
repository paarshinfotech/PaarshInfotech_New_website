import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToActionBox() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Want to Be Part of Our Next Moment?
        </h2>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          We're always looking for talented individuals who share our passion for innovation and teamwork. Explore our career opportunities.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/careers">
              Join Our Team
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
