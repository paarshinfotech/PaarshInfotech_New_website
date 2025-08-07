import { FiCheckCircle } from "react-icons/fi";
import { LuClock, LuPackage, LuRocket } from "react-icons/lu";
import type { IconType } from "react-icons";
import { Badge } from "../ui/badge";

const roadmapItems: {
  status: "Done" | "In Progress" | "Planned";
  title: string;
  description: string;
  Icon: IconType;
}[] = [
  {
    status: "Done",
    title: "Core Module Launch",
    description:
      "Successfully launched the foundational modules for all our flagship products.",
    Icon: FiCheckCircle,
  },
  {
    status: "In Progress",
    title: "Advanced AI Integration",
    description:
      "Integrating more sophisticated AI features for predictive analytics and automation.",
    Icon: LuClock,
  },
  {
    status: "Planned",
    title: "Mobile App Overhaul",
    description:
      "A complete redesign of our mobile applications for a more intuitive user experience.",
    Icon: LuPackage,
  },
  {
    status: "Planned",
    title: "Marketplace & Add-ons",
    description:
      "Introducing a marketplace for third-party integrations and add-on modules.",
    Icon: LuRocket,
  },
];

export default function ProductRoadmap() {
  const getStatusVariant = (
    status: "Done" | "In Progress" | "Planned"
  ): "default" | "secondary" | "outline" => {
    switch (status) {
      case "Done":
        return "default";
      case "In Progress":
        return "secondary";
      case "Planned":
        return "outline";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What's Next? Our Roadmap
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We are constantly innovating. Here's a glimpse of what we're working
            on to make our products even better.
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -translate-y-1/2"
            aria-hidden="true"
          />

          <div className="hidden lg:block absolute top-12 left-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
          <div className="hidden lg:block absolute top-12 right-0 w-3 h-3 bg-primary rounded-full translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-secondary rounded-full">
                  <div className="flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full ring-8 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                    <item.Icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Badge
                    variant={getStatusVariant(item.status)}
                    className="mb-2"
                  >
                    {item.status}
                  </Badge>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
