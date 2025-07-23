import type { ComponentType } from "react";

interface OurProcessServiceProps {
  steps: {
    title: string;
    description: string;
    Icon: ComponentType<React.SVGProps<SVGSVGElement> | { className?: string }>;
  }[];
}

export default function OurProcessService({ steps }: OurProcessServiceProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Proven Process
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A streamlined and transparent process to bring your ideas to life.
          </p>
        </div>
        <div className="relative">
          <div
            className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border -translate-y-1/2"
            aria-hidden="true"
          ></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-16">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-secondary rounded-full">
                  <div className="flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full ring-8 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <step.Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 mt-6">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
