import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';

const services = [
  {
    title: "Web Development",
    description: "Creating responsive, powerful, and user-friendly websites tailored to your business needs.",
  },
  {
    title: "Software Development",
    description: "Custom software solutions to streamline your operations and drive efficiency.",
  },
  {
    title: "Mobile App Development",
    description: "Building native and cross-platform mobile apps for both iOS and Android platforms.",
  },
  {
    title: "E-commerce Solutions",
    description: "Develop feature-rich online stores to sell your products and services globally.",
  },
  {
    title: "AI and ML",
    description: "Leveraging Artificial Intelligence and Machine Learning to build smart applications.",
  },
  {
    title: "UI/UX Design",
    description: "Crafting intuitive and beautiful user interfaces that enhance user experience.",
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
          {services.map((service) => (
            <Link href="/services" key={service.title} className="block">
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                  <CardDescription className="pt-2">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
