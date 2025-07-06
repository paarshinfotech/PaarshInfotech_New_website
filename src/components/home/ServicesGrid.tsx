import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Server, Smartphone, ShoppingCart, BrainCircuit, PenTool } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

const services: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: "Web Development",
    description: "Creating responsive, powerful, and user-friendly websites tailored to your business needs.",
    Icon: Code,
  },
  {
    title: "Software Development",
    description: "Custom software solutions to streamline your operations and drive efficiency.",
    Icon: Server,
  },
  {
    title: "Mobile App Development",
    description: "Building native and cross-platform mobile apps for both iOS and Android platforms.",
    Icon: Smartphone,
  },
  {
    title: "E-commerce Solutions",
    description: "Develop feature-rich online stores to sell your products and services globally.",
    Icon: ShoppingCart,
  },
  {
    title: "AI and ML",
    description: "Leveraging Artificial Intelligence and Machine Learning to build smart applications.",
    Icon: BrainCircuit,
  },
  {
    title: "UI/UX Design",
    description: "Crafting intuitive and beautiful user interfaces that enhance user experience.",
    Icon: PenTool,
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/70">
            We offer a wide range of services to cover all your digital needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ title, description, Icon }) => (
            <Card key={title} className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-transparent hover:border-primary/20">
              <CardHeader>
                <div className="mb-4">
                   <Icon className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-xl text-primary">{title}</CardTitle>
                <CardDescription className="pt-2">{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
