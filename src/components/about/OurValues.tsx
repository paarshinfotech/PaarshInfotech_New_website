import { Lightbulb, ShieldCheck, Users, HeartHandshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const values: { title: string; description: string, Icon: LucideIcon }[] = [
  {
    title: "Innovation",
    description: "We constantly explore new technologies to deliver cutting-edge solutions that drive progress.",
    Icon: Lightbulb,
  },
  {
    title: "Integrity",
    description: "Our commitment to transparency and honesty builds lasting trust with our clients and team.",
    Icon: ShieldCheck,
  },
  {
    title: "Client-Centricity",
    description: "Your success is our ultimate goal. We work collaboratively to understand and achieve your vision.",
    Icon: Users,
  },
  {
    title: "Team Spirit",
    description: "We foster a supportive environment where every member can grow, learn, and contribute their best work.",
    Icon: HeartHandshake,
  },
];

export default function OurValues() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Core Values</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            The principles that guide our work and define our culture.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {values.map(({ title, description, Icon }) => (
            <div key={title} className="flex gap-6 items-start">
              <div className="p-4 bg-primary/10 rounded-full flex-shrink-0">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
