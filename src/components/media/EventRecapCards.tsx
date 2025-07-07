import { eventRecaps } from "@/lib/mediaData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function EventRecapCards() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Event Recaps</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A look back at some of our most memorable company events and celebrations.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventRecaps.map((event) => (
            <Card key={event.title} className="flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={event.hint}
                />
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{event.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="link" className="p-0 h-auto">
                  View Gallery <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
