
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useGetECTestimonialsQuery } from "@/services/api";
import { LuLoader } from "react-icons/lu";

export default function Testimonials() {
  const { data, isLoading } = useGetECTestimonialsQuery(true); // publishedOnly=true
  const testimonials = (data?.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  // Duplicate for infinite scroll effect
  const extendedTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-7xl flex justify-center">
          <LuLoader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What Our Partners Say
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Hear from students, faculty, and trainers about their experience
            with our Centers of Excellence.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee-slow group-hover:[animation-play-state:paused]">
            {extendedTestimonials.map((testimonial: any, index: number) => (
              <div
                key={`${testimonial._id}-${index}`}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4"
              >
                <Card className="h-full bg-background shadow-lg text-center flex flex-col items-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="p-0 flex-grow flex flex-col items-center">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover mb-6 border-4 border-primary/10"
                    />
                    <p className="text-foreground/80 mb-6 italic flex-grow">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-auto">
                      <p className="font-semibold text-primary">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
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
