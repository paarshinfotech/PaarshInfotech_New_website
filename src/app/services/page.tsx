import ServicesGrid from "@/components/home/ServicesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Our Services
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            Comprehensive digital solutions to build, launch, and grow your business.
          </p>
        </div>
      </section>
      
      <ServicesGrid />

      <section className="py-16 md:py-24 bg-background">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-primary mb-4">Have a project in mind?</h2>
          <p className="text-foreground/80 mb-8">
            Let's discuss how our expertise can help you achieve your goals. Get a free, no-obligation quote today.
          </p>
          <Button asChild size="lg">
            <Link href="/quote">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>

      <WhyChooseUs />
    </>
  );
}
