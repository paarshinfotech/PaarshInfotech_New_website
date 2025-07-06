import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Core Values</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            The principles that guide our work and define our culture.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(({ title, description, Icon }) => (
            <Card key={title} className="text-center hover:shadow-xl transition-shadow duration-300 p-4 border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex justify-center mb-4">
                   <div className="p-4 bg-accent/10 rounded-full">
                     <Icon className="w-8 h-8 text-primary" />
                   </div>
                </div>
                <CardTitle className="text-xl text-primary mb-2">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
