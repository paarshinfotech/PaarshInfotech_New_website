import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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
];

export default function LeadershipTeam() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Meet Our Leaders</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            The driving force behind our innovation and success.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {leaders.map((leader) => (
            <Card 
              key={leader.name} 
              className="group grid md:grid-cols-3 items-center gap-8 p-8 bg-background shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center md:col-span-1">
                <div className="relative w-48 h-48">
                    <Image
                    src={leader.avatar}
                    alt={`Portrait of ${leader.name}`}
                    fill
                    className="object-cover rounded-full border-4 border-primary/10 transition-all duration-300 group-hover:border-accent"
                    data-ai-hint={leader.dataAiHint}
                    />
                </div>
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h3 className="text-3xl font-bold text-primary">{leader.name}</h3>
                <p className="text-base text-accent font-semibold mb-4">{leader.title}</p>
                <blockquote className="text-lg text-foreground/80 italic border-l-4 border-accent pl-4">
                  "{leader.quote}"
                </blockquote>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
