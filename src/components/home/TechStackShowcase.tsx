import { Badge } from "@/components/ui/badge";

const technologies = [
  "React", "Next.js", "TypeScript", "Python", "Django", "Node.js", 
  "PostgreSQL", "MySQL", "MongoDB", "Docker", "Kubernetes", "AWS", 
  "Google Cloud", "Firebase", "Tailwind CSS"
];

export default function TechStackShowcase() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Powering Innovation with a Modern Tech Stack</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build solutions that are not just powerful and scalable, but also future-proof.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="outline" 
              className="text-lg px-6 py-2 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
