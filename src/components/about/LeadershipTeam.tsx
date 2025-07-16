
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

const leaders = [
  {
    name: "Kantilal Pagare",
    title: "Founder & Chairman",
    quote: "Our vision is to empower businesses through technology, built on a foundation of trust and excellence.",
    avatar: "https://placehold.co/400x400.png",
    dataAiHint: "professional man"
  },
  {
    name: "Tushar Pagare",
    title: "Chief Executive Officer",
    quote: "I believe in enabling people first. Great technology is a result of a great team that feels valued and inspired.",
    avatar: "https://placehold.co/400x400.png",
    dataAiHint: "ceo portrait"
  },
  {
    name: "Pratiksha Baviskar",
    title: "Chief Financial Officer",
    quote: "Financial discipline fuels sustainable innovation and allows us to deliver consistent value to our clients.",
    avatar: "https://placehold.co/400x400.png",
    dataAiHint: "professional woman"
  },
];

export default function LeadershipTeam() {
  const [founder, ceo, cfo] = leaders;
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Meet Our Leaders</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            The driving force behind our innovation and success.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Founder Card - Spanning full width */}
            <Card 
              key={founder.name} 
              className="group grid md:grid-cols-3 items-center gap-8 p-8 bg-background shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:col-span-2"
            >
              <div className="flex justify-center md:col-span-1">
                <ImagePreviewModal imgSrc={founder.avatar} alt={`Portrait of ${founder.name}`}>
                  <div className="relative w-48 h-48 cursor-pointer">
                      <Image
                      src={founder.avatar}
                      alt={`Portrait of ${founder.name}`}
                      fill
                      className="object-cover rounded-full border-4 border-primary/10 transition-all duration-300 group-hover:border-accent"
                      data-ai-hint={founder.dataAiHint}
                      />
                  </div>
                </ImagePreviewModal>
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h3 className="text-3xl font-bold text-primary">{founder.name}</h3>
                <p className="text-base text-accent font-semibold mb-4">{founder.title}</p>
                <blockquote className="text-lg text-foreground/80 italic border-l-4 border-accent pl-4">
                  "{founder.quote}"
                </blockquote>
              </div>
            </Card>

            {/* CEO Card */}
            <Card 
              key={ceo.name} 
              className="group flex flex-col items-center gap-6 p-8 bg-background shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <ImagePreviewModal imgSrc={ceo.avatar} alt={`Portrait of ${ceo.name}`}>
                <div className="relative w-40 h-40 cursor-pointer">
                    <Image
                    src={ceo.avatar}
                    alt={`Portrait of ${ceo.name}`}
                    fill
                    className="object-cover rounded-full border-4 border-primary/10 transition-all duration-300 group-hover:border-accent"
                    data-ai-hint={ceo.dataAiHint}
                    />
                </div>
              </ImagePreviewModal>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-primary">{ceo.name}</h3>
                <p className="text-sm text-accent font-semibold mb-3">{ceo.title}</p>
                <blockquote className="text-base text-foreground/80 italic">
                  "{ceo.quote}"
                </blockquote>
              </div>
            </Card>

            {/* CFO Card */}
             <Card 
              key={cfo.name} 
              className="group flex flex-col items-center gap-6 p-8 bg-background shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <ImagePreviewModal imgSrc={cfo.avatar} alt={`Portrait of ${cfo.name}`}>
                <div className="relative w-40 h-40 cursor-pointer">
                    <Image
                    src={cfo.avatar}
                    alt={`Portrait of ${cfo.name}`}
                    fill
                    className="object-cover rounded-full border-4 border-primary/10 transition-all duration-300 group-hover:border-accent"
                    data-ai-hint={cfo.dataAiHint}
                    />
                </div>
              </ImagePreviewModal>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-primary">{cfo.name}</h3>
                <p className="text-sm text-accent font-semibold mb-3">{cfo.title}</p>
                <blockquote className="text-base text-foreground/80 italic">
                  "{cfo.quote}"
                </blockquote>
              </div>
            </Card>
        </div>
      </div>
    </section>
  );
}
