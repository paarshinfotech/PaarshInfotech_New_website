import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Have a project in mind or need help?
        </h2>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Our team is ready to collaborate with you to bring your vision to life. Let's discuss how we can help you achieve your goals.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/quote">Get a Quote</Link>
          </Button>
           <Button asChild size="lg" variant="outline" className="bg-primary hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground/50">
            <Link href="/services">Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
