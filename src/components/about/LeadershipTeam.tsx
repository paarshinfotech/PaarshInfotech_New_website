import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const leaders = [
  {
    name: "Kantilal Pagare",
    title: "Founder & Chairman",
    quote: "Our vision is to empower businesses through technology, built on a foundation of trust and excellence.",
    avatar: "https://placehold.co/200x200.png",
    dataAiHint: "professional man"
  },
  {
    name: "Tushar Pagare",
    title: "Chief Executive Officer",
    quote: "I believe in enabling people first. Great technology is a result of a great team that feels valued and inspired.",
    avatar: "https://placehold.co/200x200.png",
    dataAiHint: "ceo portrait"
  },
];

export default function LeadershipTeam() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Meet Our Leaders</h2>
          <p className="mt-4 text-lg text-foreground/70">
            The driving force behind our innovation and success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leaders.map((leader) => (
            <Card key={leader.name} className="overflow-hidden">
              <CardContent className="p-6 text-center">
                <Image
                  src={leader.avatar}
                  alt={`Portrait of ${leader.name}`}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 border-4 border-primary/10"
                  data-ai-hint={leader.dataAiHint}
                />
                <h3 className="text-xl font-bold text-primary">{leader.name}</h3>
                <p className="text-sm text-accent font-semibold mb-4">{leader.title}</p>
                <blockquote className="text-base text-foreground/80 italic border-l-2 border-border pl-4">
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
