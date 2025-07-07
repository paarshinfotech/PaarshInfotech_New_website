import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { servicesData } from "@/lib/servicesData";
import { ArrowRight } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We offer a wide range of services to cover all your digital needs, from web development to AI-powered solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="block group h-full">
                <Card className="flex flex-col h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2 border">
                    <CardHeader>
                        <div className="p-3 bg-primary/10 rounded-full w-fit mb-4 transition-colors group-hover:bg-accent">
                            <service.Icon className="w-8 h-8 text-primary transition-colors group-hover:text-accent-foreground" />
                        </div>
                        <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <div className="font-semibold text-sm text-primary group-hover:text-accent flex items-center">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardFooter>
                </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
