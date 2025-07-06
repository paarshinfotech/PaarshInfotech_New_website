import Image from "next/image";

interface ServiceOverviewProps {
  title: string;
  overview: string;
  heroImage: string;
}

export default function ServiceOverview({ title, overview, heroImage }: ServiceOverviewProps) {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container grid md:grid-cols-2 gap-12 items-center max-w-7xl">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            {title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            {overview}
          </p>
        </div>
        <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-2xl">
           <Image src={heroImage} alt={title} fill className="object-cover" data-ai-hint="service technology" />
        </div>
      </div>
    </section>
  );
}
