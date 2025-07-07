"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { mediaTestimonials } from "@/lib/mediaData";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaTestimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background shadow-lg">
                <CardContent className="p-8 text-center flex flex-col items-center">
                    <Image src={testimonial.avatar} alt={testimonial.name} width={80} height={80} className="rounded-full object-cover mb-6 border-4 border-primary/10" data-ai-hint={testimonial.hint} />
                    <p className="text-foreground/80 mb-6 italic flex-grow">"{testimonial.quote}"</p>
                    <div className="mt-auto">
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
