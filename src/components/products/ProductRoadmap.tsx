
import { CheckCircle, Clock, Package, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const roadmapItems: {
  status: "Done" | "In Progress" | "Planned";
  title: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    status: "Done",
    title: "Core Module Launch",
    description: "Successfully launched the foundational modules for all our flagship products.",
    Icon: CheckCircle,
  },
  {
    status: "In Progress",
    title: "Advanced AI Integration",
    description: "Integrating more sophisticated AI features for predictive analytics and automation.",
    Icon: Clock,
  },
  {
    status: "Planned",
    title: "Mobile App Overhaul",
    description: "A complete redesign of our mobile applications for a more intuitive user experience.",
    Icon: Package,
  },
  {
    status: "Planned",
    title: "Marketplace & Add-ons",
    description: "Introducing a marketplace for third-party integrations and add-on modules.",
    Icon: Rocket,
  },
];

export default function ProductRoadmap() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-500";
      case "In Progress": return "bg-blue-500";
      case "Planned": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">What's Next? Our Roadmap</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We are constantly innovating. Here's a glimpse of what we're working on to make our products even better.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
          
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative flex items-start group pl-12">
                <div className="absolute left-4 -translate-x-1/2 z-10 flex items-center justify-center">
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(item.status)} ring-8 ring-secondary`} />
                </div>
                
                <div className="w-full">
                  <div className="flex items-center gap-4">
                     <item.Icon className="w-6 h-6 text-primary" />
                     <div>
                        <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                        <p className="text-sm font-semibold text-muted-foreground">{item.status}</p>
                     </div>
                  </div>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
