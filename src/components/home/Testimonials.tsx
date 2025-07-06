"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const testimonials = [
  {
    quote: "Paarsh Infotech delivered an outstanding product that exceeded our expectations. Their team is professional, skilled, and incredibly responsive. Highly recommended!",
    name: "Shruti Sharma",
    title: "Python Developer",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "Working with this team was a game-changer for our business. The final software is not only robust but was also delivered ahead of schedule. A truly reliable partner.",
    name: "Amit Patel",
    title: "Project Manager, ABC Corp",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "The level of expertise and dedication from Paarsh Infotech is unparalleled. They transformed our initial idea into a full-fledged, successful application.",
    name: "Priya Singh",
    title: "Founder, StartupX",
    avatar: "https://placehold.co/100x100.png"
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Real stories from satisfied partners.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card className="h-full bg-background shadow-lg flex flex-col">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center flex-grow">
                       <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="rounded-full mb-4 border-2 border-primary/20"
                        data-ai-hint="person"
                      />
                      <p className="text-base text-foreground/80 mb-6 flex-grow">"{testimonial.quote}"</p>
                      <div className="mt-auto">
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
