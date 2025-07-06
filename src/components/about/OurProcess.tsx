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
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center p-4 group">
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-[calc(50%+4px)] z-10" />
                    <div className="mb-4 bg-primary text-primary-foreground p-4 rounded-full border-4 border-background shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                    <step.Icon className="w-8 h-8" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 mt-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
