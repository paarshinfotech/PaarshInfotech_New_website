import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { IconType } from "react-icons";
import { LuServerCrash, LuZap, LuTarget, LuUsers } from "react-icons/lu";

const problemSolutionData: {
  problem: string;
  service: string;
  solution: string;
  Icon: IconType;
}[] = [
  {
    problem: "Outdated website driving customers away.",
    service: "Web Development & UI/UX Design",
    solution:
      "We build modern, responsive websites with intuitive user interfaces that convert visitors into loyal customers.",
    Icon: LuServerCrash,
  },
  {
    problem: "Manual processes are slowing down growth.",
    service: "Workflow Automation",
    solution:
      "Our automation solutions streamline your operations, reduce errors, and free up your team to focus on strategic tasks.",
    Icon: LuZap,
  },
  {
    problem: "Struggling to reach the right audience online.",
    service: "Digital Marketing",
    solution:
      "We create data-driven marketing campaigns that target your ideal customers and deliver measurable results.",
    Icon: LuTarget,
  },
  {
    problem: "Losing customers to mobile-first competitors.",
    service: "Mobile App Development",
    solution:
      "Engage your users on the go with a powerful, user-friendly mobile application for iOS and Android.",
    Icon: LuUsers,
  },
];

export default function ProblemSolutionGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            From Problem to Solution
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Whatever your business challenge, we have a technology solution to
            match.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problemSolutionData.map((item) => (
            <div
              key={item.problem}
              className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <item.Icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground mb-1">
                    The Challenge:
                  </p>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {item.problem}
                  </h3>
                  <p className="font-semibold text-primary mb-1">
                    {item.service}
                  </p>
                  <p className="text-muted-foreground">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
