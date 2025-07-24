
import { Badge } from "@/components/ui/badge";
import { techStack } from "@/lib/excellenceCentersData";

export default function TechStack() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Technologies We Teach
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We focus on a modern, in-demand technology stack to ensure our
            students are industry-ready.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {techStack.map((tech) => (
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
