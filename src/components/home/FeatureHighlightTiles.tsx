import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Zap, Users, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: "Internship Opportunities",
    description: "Nurturing the next generation of tech leaders with hands-on experience and mentorship.",
    Icon: Briefcase,
  },
  {
    title: "Live Project Training",
    description: "Gain real-world skills by working on active client projects under expert guidance.",
    Icon: Zap,
  },
  {
    title: "Client-Centric Approach",
    description: "Your success is our priority. We build lasting partnerships through collaboration and transparency.",
    Icon: Users,
  },
  {
    title: "Employee-First Culture",
    description: "We invest in our team's growth and well-being, fostering an environment of innovation.",
    Icon: HeartHandshake,
  },
];

export default function FeatureHighlightTiles() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">More Than a Workplace</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We're building a community dedicated to growth, learning, and making a real impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -skew-y-2">
          {features.map(({ title, description, Icon }) => (
            <Card key={title} className="group transform transition-all duration-300 ease-in-out hover:skew-y-0 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-accent transition-colors">
                  <Icon className="w-8 h-8 text-primary group-hover:text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
