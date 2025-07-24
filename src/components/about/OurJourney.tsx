import { ComponentType } from "react";

import {
  LuBriefcase,
  LuBuilding2,
  LuFlag,
  LuGlobe,
  LuRocket,
} from "react-icons/lu";

const journeyMilestones: {
  year: string;
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  {
    year: "2018",
    title: "Foundation Laid",
    description:
      "Paarsh Infotech was founded with a vision to provide world-class IT solutions and build lasting client relationships.",
    Icon: LuFlag,
  },
  {
    year: "2019",
    title: "First Major Project",
    description:
      "Successfully delivered our first large-scale enterprise software, setting a benchmark for quality and performance.",
    Icon: LuBriefcase,
  },
  {
    year: "2021",
    title: "Team Expansion",
    description:
      "Grew our team of passionate experts, bringing in diverse talent to expand our service offerings.",
    Icon: LuBuilding2,
  },
  {
    year: "2023",
    title: "100+ Projects Milestone",
    description:
      "Celebrated the completion of over 100 successful projects, empowering businesses across various industries.",
    Icon: LuRocket,
  },
  {
    year: "2024",
    title: "Expanding Globally",
    description:
      "Began serving international clients, marking our entry into the global software development landscape.",
    Icon: LuGlobe,
  },
];

export default function OurJourney() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Journey
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Tracing the milestones that have shaped our growth and defined our
            path to excellence.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2"
            aria-hidden="true"
          >
            <div className="absolute top-0 w-3 h-3 bg-primary rounded-full -translate-x-[calc(50%-1px)]"></div>
            <div className="absolute bottom-0 w-3 h-3 bg-primary rounded-full -translate-x-[calc(50%-1px)]"></div>
          </div>

          <div className="space-y-8">
            {journeyMilestones.map((item, index) => (
              <div
                key={item.year}
                className="relative flex items-center md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary absolute left-4 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10 ring-8 ring-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <item.Icon className="w-4 h-4" />
                </div>

                <div className="w-full md:w-[calc(50%-2.5rem)] bg-background p-6 rounded-lg shadow-md border border-transparent md:group-odd:ml-auto md:group-even:mr-auto group-hover:border-accent group-hover:shadow-lg transition-all duration-300 ml-14 md:ml-0">
                  <p className="text-accent font-bold text-lg mb-1">
                    {item.year}
                  </p>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
