"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

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
  {
    quote: "The team's dedication to quality is evident in every project. They are not just developers; they are true partners in our success.",
    name: "Ravi Kumar",
    role: "Project Lead, Tech Solutions Inc.",
  },
];

export default function Testimonials() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">From Our Team & Partners</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Hear what our interns, employees, and clients have to say about their experience with us.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="h-full bg-background shadow-lg flex flex-col justify-between p-8 relative overflow-hidden">
                    <CardContent className="p-0 z-10">
                      <p className="text-lg text-foreground/90 mb-6 font-medium italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-bold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                    <div className="absolute -bottom-8 -right-8 text-9xl font-bold text-primary/5 z-0 select-none">
                      ”
                    </div>
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
