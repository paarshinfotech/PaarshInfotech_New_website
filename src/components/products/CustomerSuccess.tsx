"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useGetProductTestimonialsQuery } from "@/services/api";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

interface ApiResponse {
  success: boolean;
  results: number;
  data: Testimonial[];
}

export default function CustomerSuccess() {
  const {
    data: testimonialsData,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useGetProductTestimonialsQuery(undefined);

  // Log data for debugging
  console.log("Testimonials data:", testimonialsData);

  // Handle loading state
  if (testimonialsLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Hear From Our Customers
            </h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Real success stories from businesses transformed by our products.
            </p>
          </div>
          <div className="text-center">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (testimonialsError) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Hear From Our Customers
            </h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Real success stories from businesses transformed by our products.
            </p>
          </div>
          <div className="text-center text-red-500">
            Failed to load testimonials. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  // Handle empty or invalid data state
  const testimonials = (testimonialsData as ApiResponse)?.data || [];
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Hear From Our Customers
            </h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Real success stories from businesses transformed by our products.
            </p>
          </div>
          <div className="text-center">No testimonials available at the moment.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Hear From Our Customers
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Real success stories from businesses transformed by our products.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee-left group-hover:[animation-play-state:paused]">
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4"
              >
                <Card className="h-full bg-secondary/50 shadow-sm flex flex-col p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="p-0 flex-grow">
                    <p className="text-foreground/80 mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                      data-ai-hint="person"
                    />
                    <div>
                      <p className="font-semibold text-primary">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background"></div>
        </div>
      </div>
    </section>
  );
}