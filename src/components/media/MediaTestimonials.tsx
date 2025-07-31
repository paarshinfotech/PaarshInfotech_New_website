
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { mediaTestimonials } from "@/lib/mediaData";

// We duplicate the testimonials to create a seamless loop for the marquee effect.
const extendedTestimonials = [...mediaTestimonials, ...mediaTestimonials];

export default function MediaTestimonials() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Voices from Our Team</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Hear directly from our team members about our culture and work environment.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
            <div className="flex animate-marquee-left group-hover:[animation-play-state:paused]">
                {extendedTestimonials.map((testimonial, index) => (
                    <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                        <Card className="h-full bg-background shadow-lg text-center flex flex-col items-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <CardContent className="p-0 flex-grow flex flex-col items-center">
                                <Image src={testimonial.avatar} alt={testimonial.name} width={80} height={80} className="rounded-full object-cover mb-6 border-4 border-primary/10" data-ai-hint={testimonial.hint} />
                                <p className="text-foreground/80 mb-6 italic flex-grow">"{testimonial.quote}"</p>
                                <div className="mt-auto">
                                    <p className="font-semibold text-primary">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </CardContent>
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
