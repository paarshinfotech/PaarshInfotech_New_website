
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useGetTestimonialsQuery } from "../../services/api";

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  title: string;
  avatar: string;
  published: boolean;
}

export default function Testimonials() {
  const {
    data: testimonialsData,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useGetTestimonialsQuery(undefined);

  const testimonials = testimonialsData?.data || [];

  // Filter published testimonials and duplicate for marquee effect
  const publishedTestimonials = testimonials.filter((t: Testimonial) => t.published);
  const extendedTestimonials = [...publishedTestimonials, ...publishedTestimonials];

  // Skeleton component for loading state
  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-80 md:w-1/2 lg:w-[30%] p-2 md:p-4">
      <Card className="h-full bg-background shadow-md flex flex-col p-4 md:p-8">
        <CardContent className="p-0 flex-grow">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          </div>
        </CardContent>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex-grow">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-1 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </Card>
    </div>
  );

  if (testimonialsError) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Real stories from satisfied partners who trust our work.
            </p>
          </div>
          <div className="text-center text-red-500">
            Error: Failed to load testimonials. Please try again later.
          </div>
        </div>
      </section>
    );
  }

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
            {testimonialsLoading
              ? // Render 6 skeleton cards during loading
                Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
              : extendedTestimonials.map((testimonial: Testimonial, index: number) => (
                  <div key={`${testimonial._id}-${index}`} className="flex-shrink-0 w-80 md:w-1/2 lg:w-[30%] p-2 md:p-4">
                    <Card className="h-full bg-background shadow-md flex flex-col p-4 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <CardContent className="p-0 flex-grow">
                        <p className="text-foreground/80 mb-6 italic text-sm md:text-base">"{testimonial.quote}"</p>
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
                          <p className="font-semibold text-primary">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
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


