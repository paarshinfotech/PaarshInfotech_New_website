import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const technologies = [
  "React", "Next.js", "TypeScript", "Python", "Django", "Node.js", 
  "PostgreSQL", "MySQL", "MongoDB", "Docker", "Kubernetes", "AWS", 
  "Google Cloud", "Firebase", "Tailwind CSS", "Java", "Spring Boot", "Kotlin"
];

// Split the array into two halves
const midPoint = Math.ceil(technologies.length / 2);
const firstRow = technologies.slice(0, midPoint);
const secondRow = technologies.slice(midPoint);


const TechBadge = ({ name }: { name: string }) => (
  <Badge 
    variant="outline" 
    className="text-lg px-6 py-2 border-primary/20 bg-primary/5 shadow-sm text-nowrap"
  >
    {name}
  </Badge>
);

export default function TechStackShowcase() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Powering Innovation with a Modern Tech Stack</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build solutions that are not just powerful and scalable, but also future-proof.
          </p>
        </div>
        
        <div className="relative flex flex-col gap-4 overflow-hidden">
            {/* Left-to-Right Scrolling Row */}
            <div className="flex animate-marquee-right space-x-4">
              {[...firstRow, ...firstRow].map((tech, index) => (
                <TechBadge key={`first-${index}-${tech}`} name={tech} />
              ))}
            </div>
            
            {/* Right-to-Left Scrolling Row */}
            <div className="flex animate-marquee-left space-x-4">
              {[...secondRow, ...secondRow].map((tech, index) => (
                <TechBadge key={`second-${index}-${tech}`} name={tech} />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}
