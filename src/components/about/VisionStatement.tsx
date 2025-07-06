import { Quote } from "lucide-react";

export default function VisionStatement() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Vision</h2>
        <div className="relative">
          <Quote className="w-24 h-24 text-primary/5 absolute -top-8 -left-8 transform -rotate-12" />
          <Quote className="w-24 h-24 text-primary/5 absolute -bottom-8 -right-8 transform rotate-12" />
          <blockquote className="relative z-10 text-xl md:text-2xl text-foreground/80 leading-relaxed bg-background p-8 rounded-lg shadow-lg">
            To be a leading Web Solution company in the IT sector, known for our innovative solutions and commitment to client success. We aim to empower businesses through technology, driving growth and efficiency with every project we deliver.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
