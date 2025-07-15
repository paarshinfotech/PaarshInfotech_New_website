
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    quote: "The internship program provided invaluable hands-on experience on live projects. The mentorship I received was top-notch and prepared me for a career in tech.",
    name: "Pooja Gharte",
    role: "Full Stack Web Developer",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "Paarsh Infotech's team is incredibly skilled and supportive. I learned more in six months here than in two years of college.",
    name: "Amit Jadhav",
    role: "Former Intern, now Software Engineer",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "A great place to start your career. The company culture fosters learning and growth, and the team is always willing to help.",
    name: "Sneha Patil",
    role: "Data Science Intern",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "The team's dedication to quality is evident in every project. They are not just developers; they are true partners in our success.",
    name: "Ravi Kumar",
    role: "Project Lead, Tech Solutions Inc.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary">From Our Team & Partners</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Hear what our interns, employees, and clients have to say about their experience with us.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {extendedTestimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                  <Card className="h-full bg-background shadow-lg flex flex-col p-8">
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
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-secondary via-transparent to-secondary"></div>
        </div>
      </div>
    </section>
  );
}
