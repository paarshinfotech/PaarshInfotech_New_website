import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuBriefcase, LuZap, LuUsers, LuHeartHandshake } from "react-icons/lu";
import type { ComponentType } from "react";

const features: {
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  {
    title: "Internship Opportunities",
    description:
      "Nurturing the next generation of tech leaders with hands-on experience and mentorship.",
    Icon: LuBriefcase,
  },
  {
    title: "Live Project Training",
    description:
      "Gain real-world skills by working on active client projects under expert guidance.",
    Icon: LuZap,
  },
  {
    title: "Client-Centric Approach",
    description:
      "Your success is our priority. We build lasting partnerships through collaboration and transparency.",
    Icon: LuUsers,
  },
  {
    title: "Employee-First Culture",
    description:
      "We invest in our team's growth and well-being, fostering an environment of innovation.",
    Icon: LuHeartHandshake,
  },
];

export default function FeatureHighlightTiles() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            More Than a Workplace
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We're building a community dedicated to growth, learning, and making
            a real impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description, Icon }) => (
            <Card
              key={title}
              className="group text-center p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-background"
            >
              <CardHeader className="p-0 items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-6 transition-colors duration-300 group-hover:bg-accent">
                  <Icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-accent-foreground" />
                </div>
                <CardTitle className="text-xl text-primary">{title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
