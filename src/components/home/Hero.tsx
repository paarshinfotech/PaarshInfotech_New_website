import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container grid md:grid-cols-2 gap-12 items-center max-w-7xl">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary mb-6">
            Best Software Development Company in Nashik
          </h1>
          <p className="max-w-2xl mx-auto md:mx-0 text-lg md:text-xl text-foreground/80 mb-8">
            We deliver high-quality, reliable, and scalable software solutions to help your business grow.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow">
              <Link href="/quote">Get A Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-2xl group hidden md:block">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Innovative Software Solutions"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="technology abstract"
            />
        </div>
      </div>
    </section>
  );
}
