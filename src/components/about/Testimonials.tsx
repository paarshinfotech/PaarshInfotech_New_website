"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The internship program provided invaluable hands-on experience on live projects. The mentorship I received was top-notch and prepared me for a career in tech.",
    name: "Pooja Gharte",
    role: "Full Stack Web Developer",
  },
  {
    quote: "Paarsh Infotech's team is incredibly skilled and supportive. I learned more in six months here than in two years of college.",
    name: "Amit Jadhav",
    role: "Former Intern, now Software Engineer",
  },
  {
    quote: "A great place to start your career. The company culture fosters learning and growth, and the team is always willing to help.",
    name: "Sneha Patil",
    role: "Data Science Intern",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">From Our Team</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Hear what our interns and employees have to say.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                <div className="p-4 h-full">
                  <Card className="h-full bg-background shadow-lg flex flex-col">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center flex-grow">
                      <Quote className="w-10 h-10 text-accent mb-4" />
                      <p className="text-base text-foreground/80 mb-6 flex-grow">"{testimonial.quote}"</p>
                      <div className="mt-auto">
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
