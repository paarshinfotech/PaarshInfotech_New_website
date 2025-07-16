
import Image from "next/image";
import { Check } from "lucide-react";

const benefits = [
  "Streamline complex workflows and reduce manual effort.",
  "Gain a single source of truth for all your business data.",
  "Enhance team collaboration and productivity.",
  "Make data-driven decisions with real-time analytics.",
  "Improve customer satisfaction and retention.",
];

export default function ProductBenefits() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg group">
            <Image 
              src="https://placehold.co/600x800.png"
              alt="Team collaborating on a project"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="team collaboration"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary tracking-tight">Unlock Your Business's Full Potential</h2>
            <p className="text-lg text-muted-foreground">
              Our integrated product suite is more than just software. It's a catalyst for transformation, designed to address your key business challenges and drive tangible results.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 p-1 bg-primary text-primary-foreground rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-foreground/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
