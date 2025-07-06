import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { servicesData } from "@/lib/servicesData";

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
          {servicesData.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="block h-full">
                <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-transparent hover:border-primary/20">
                    <CardHeader>
                        <div className="mb-4">
                        <service.Icon className="w-10 h-10 text-accent" />
                        </div>
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
