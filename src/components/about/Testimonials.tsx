"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetTestimonialsQuery } from "@/services/api";
import { LuStar } from "react-icons/lu";

interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  rating: number;
  feedback: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery(true); // Only active testimonials

  // Duplicate testimonials for seamless marquee effect, triple for single testimonial
  const extendedTestimonials =
    testimonials.length === 1
      ? [...testimonials, ...testimonials, ...testimonials]
      : [...testimonials, ...testimonials];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <LuStar
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">From Our Team & Partners</h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Hear what our interns, employees, and clients have to say about their experience with us.
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading testimonials...</div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">From Our Team & Partners</h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Hear what our interns, employees, and clients have to say about their experience with us.
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">No testimonials available.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">From Our Team & Partners</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Hear what our interns, employees, and clients have to say about their experience with us.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex marquee group-hover:[animation-play-state:paused]">
            {extendedTestimonials.map((testimonial: Testimonial, index: number) => (
              <div key={`${testimonial._id}-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                <Card className="h-full bg-background shadow-lg flex flex-col p-8">
                  <CardContent className="p-0 flex-grow">
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({testimonial.rating}/5)
                      </span>
                    </div>
                    <p className="text-foreground/80 mb-6 italic">"{testimonial.feedback}"</p>
                  </CardContent>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
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