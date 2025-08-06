

import Image from 'next/image';

interface MediaHeroProps {
    heroImage?: {
        imageUrl: string;
        alt: string;
        hint: string;
    }
}

export default function MediaHero({ heroImage }: MediaHeroProps) {
  return (
    <section className="relative py-24 md:py-36 bg-secondary text-center">
      <div className="absolute inset-0">
        <Image
          src={heroImage?.imageUrl || "https://placehold.co/1920x800.png"}
          alt={heroImage?.alt || "Paarsh Infotech Team Moments"}
          fill
          className="object-cover"
          data-ai-hint={heroImage?.hint || "team celebration"}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative container max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
          Inside Paarsh Infotech
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/80">
          Explore the culture, moments, and memories that make our team special.
        </p>
      </div>
    </section>
  );
}
