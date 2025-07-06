import { Badge } from "@/components/ui/badge";

interface IndustriesServedProps {
  industries: string[];
}

export default function IndustriesServed({ industries }: IndustriesServedProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Industries We Serve</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Our solutions are trusted by a diverse range of industries.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {industries.map((industry) => (
            <Badge 
              key={industry} 
              variant="outline" 
              className="text-lg px-6 py-2 border-primary/20 bg-primary/5 hover:bg-primary/10 text-foreground"
            >
              {industry}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
