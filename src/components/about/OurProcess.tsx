import { Search, PenTool, Code, Rocket, LifeBuoy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const processSteps: { title: string; description: string; Icon: LucideIcon }[] = [
  { title: "1. Discover", description: "We start by understanding your vision, goals, and requirements through in-depth analysis.", Icon: Search },
  { title: "2. Design", description: "Our team crafts intuitive UI/UX designs and a solid technical architecture for your project.", Icon: PenTool },
  { title: "3. Develop", description: "Following agile methodologies, our developers write clean, efficient, and scalable code.", Icon: Code },
  { title: "4. Deploy", description: "We handle the seamless deployment of your application to the cloud with rigorous testing.", Icon: Rocket },
  { title: "5. Support", description: "Our partnership continues with ongoing support and maintenance to ensure long-term success.", Icon: LifeBuoy },
];

export default function OurProcess() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">How We Work</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A streamlined and transparent process to bring your ideas to life, from concept to launch and beyond.
          </p>
        </div>
        
        <div className="relative">
          {/* Desktop horizontal line */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border -translate-y-1/2" aria-hidden="true"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-16">
            {processSteps.map((step) => (
              <div key={step.title} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-background rounded-full">
                  <div className="flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full ring-8 ring-primary/5 transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:ring-accent/10 group-hover:scale-105">
                    <step.Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 mt-6">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
