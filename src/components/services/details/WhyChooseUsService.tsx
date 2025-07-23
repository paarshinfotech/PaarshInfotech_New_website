import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { ComponentType } from "react";

interface WhyChooseUsServiceProps {
  reasons: {
    title: string;
    description: string;
    Icon: ComponentType<React.SVGProps<SVGSVGElement> | { className?: string }>;
  }[];
}

export default function WhyChooseUsService({
  reasons,
}: WhyChooseUsServiceProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Why Partner With Us?
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Our unique approach and commitment to excellence set us apart.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map(({ title, description, Icon }) => (
            <Card
              key={title}
              className="text-center hover:shadow-xl transition-shadow duration-300 p-4 bg-background"
            >
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl text-primary mb-2">
                  {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
