
"use client";

import { Card, CardContent } from "@/components/ui/card";
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
  {
    quote: "The custom software built by Paarsh Infotech is the backbone of our operations. It's reliable, fast, and has significantly improved our team's productivity.",
    name: "Anjali Mehta",
    role: "COO, Global Logistics",
    avatar: "https://placehold.co/100x100.png"
  },
];

// We duplicate the testimonials to create a seamless loop for the marquee effect.
const extendedTestimonials = [...testimonials, ...testimonials];


export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Real stories from satisfied partners who trust our work.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee-left group-hover:[animation-play-state:paused]">
            {extendedTestimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-[30%] p-4">
                  <Card className="h-full bg-background shadow-md flex flex-col p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardContent className="p-0 flex-grow">
                      <p className="text-foreground/80 mb-6 italic">"{testimonial.quote}"</p>
                    </CardContent>
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t">
                        <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full object-cover" data-ai-hint="person" />
                        <div>
                            <p className="font-semibold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title || testimonial.role}</p>
                        </div>
                    </div>
                  </Card>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-secondary via-transparent to-secondary"></div>
        </div>
      </div>
    </section>
  );
}
