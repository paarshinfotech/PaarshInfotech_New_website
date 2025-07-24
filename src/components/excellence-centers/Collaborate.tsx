
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Collaborate() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Partner with Us
        </h2>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Is your institution interested in establishing a Center of Excellence?
          Let's collaborate to empower your students and shape the future of
          tech.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Become a Partner <LuArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
