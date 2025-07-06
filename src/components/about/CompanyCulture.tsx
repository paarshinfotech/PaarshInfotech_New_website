import Image from "next/image";

const cultureImages = [
  { src: "https://placehold.co/600x400.png", alt: "Team celebration", dataAiHint: "team celebration" },
  { src: "https://placehold.co/600x400.png", alt: "Collaborative workshop", dataAiHint: "workshop collaboration" },
  { src: "https://placehold.co/600x400.png", alt: "Company hackathon", dataAiHint: "hackathon event" },
  { src: "https://placehold.co/600x400.png", alt: "Diwali party at office", dataAiHint: "office party" },
];

export default function CompanyCulture() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Moments That Matter</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A glimpse into our vibrant company culture, where we work hard and celebrate our successes together.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cultureImages.map((image, index) => (
            <div key={index} className="relative aspect-square w-full rounded-lg overflow-hidden group shadow-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={image.dataAiHint}
              />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
