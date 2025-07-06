import { Quote } from "lucide-react";

export default function VisionStatement() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container max-w-4xl text-center relative">
        <Quote className="w-16 h-16 text-accent/50 absolute -top-8 left-1/2 -translate-x-1/2" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Vision</h2>
        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
          To be a leading Web Solution company in the IT sector, known for our innovative solutions and commitment to client success. We aim to empower businesses through technology, driving growth and efficiency with every project we deliver.
        </p>
      </div>
    </section>
  );
}
