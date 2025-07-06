import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TechStackProps {
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
}

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Technology Stack</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We use a modern, robust stack to build scalable and high-performance applications.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(techStack).map(([category, technologies]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize text-primary">{category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
