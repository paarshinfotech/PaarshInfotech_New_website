import { LuUsers, LuBriefcase, LuTrendingUp } from "react-icons/lu";
import type { ComponentType } from "react";

const stats: {
  value: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { value: "50+", label: "Remote Sale Experts", Icon: LuUsers },
  { value: "8+", label: "New Clients per Month", Icon: LuBriefcase },
  { value: "9+", label: "Requests per Week", Icon: LuTrendingUp },
];

export default function CompanyStats() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-background p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                <stat.Icon className="w-16 h-16 text-accent" />
              </div>
              <p className="text-5xl font-extrabold text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-base font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
