import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="py-24 md:py-40 bg-gradient-to-b from-secondary via-secondary to-background">
      <div className="container text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary mb-6">
          Best Software Development Company in Nashik
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
          We deliver high-quality, reliable, and scalable software solutions to help your business grow.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow">
            <Link href="/quote">Get A Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
