import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {leaders.map((leader) => (
            <Card 
              key={leader.name} 
              className="group flex flex-col items-center text-center p-8 bg-background shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2"
            >
              <CardHeader className="p-0 items-center">
                <div className="relative w-40 h-40 mb-6">
                    <Image
                    src={leader.avatar}
                    alt={`Portrait of ${leader.name}`}
                    fill
                    className="object-cover rounded-full border-4 border-primary/10 transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={leader.dataAiHint}
                    />
                </div>
                <h3 className="text-2xl font-bold text-primary">{leader.name}</h3>
                <p className="text-base text-accent font-semibold">{leader.title}</p>
              </CardHeader>
              <CardContent className="p-0 mt-6 flex-grow flex items-center">
                <blockquote className="text-foreground/80 italic border-t-2 border-accent pt-6">
                  "{leader.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
