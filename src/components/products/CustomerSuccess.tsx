
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    quote: "Using Paarsh CRM has been a game-changer. Our sales cycle has shortened by 30%, and the team collaboration features are fantastic.",
    name: "Aarav Sharma",
    role: "Sales Director, Tech Innovators",
    product: "Paarsh CRM",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "Paarsh HRMS simplified all our HR processes. From onboarding to payroll, everything is now automated and error-free. Our HR team can now focus on strategy.",
    name: "Priya Singh",
    role: "HR Manager, Global Logistics",
    product: "Paarsh HRMS",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "The level of integration with Paarsh ERP is incredible. We finally have a single source of truth for our entire operation, which has improved our decision-making.",
    name: "Rohan Gupta",
    role: "COO, Prime Manufacturing",
    product: "Paarsh ERP",
    avatar: "https://placehold.co/100x100.png"
  },
];

const extendedTestimonials = [...testimonials, ...testimonials];

export default function CustomerSuccess() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Hear From Our Customers</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Real success stories from businesses transformed by our products.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {extendedTestimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                  <Card className="h-full bg-secondary/50 shadow-sm flex flex-col p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardContent className="p-0 flex-grow">
                      <p className="text-foreground/80 mb-6 italic">"{testimonial.quote}"</p>
                    </CardContent>
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t">
                        <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full object-cover" data-ai-hint="person" />
                        <div>
                            <p className="font-semibold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
