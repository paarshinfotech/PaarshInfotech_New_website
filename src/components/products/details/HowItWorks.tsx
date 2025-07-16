import { UserPlus, Settings, LineChart, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: { title: string; description: string; Icon: LucideIcon }[] = [
  { title: "1. Integrate & Setup", description: "Easily connect your existing tools and configure the platform to match your workflow in minutes.", Icon: Settings },
  { title: "2. Onboard Your Team", description: "Invite your team members and assign roles. Our intuitive interface ensures a smooth onboarding process.", Icon: UserPlus },
  { title: "3. Automate & Analyze", description: "Let the platform handle repetitive tasks while you gain real-time insights from our powerful analytics dashboard.", Icon: LineChart },
  { title: "4. Achieve Your Goals", description: "Watch your productivity soar and make data-driven decisions that lead to measurable business growth.", Icon: CheckCircle },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Get Started in 4 Simple Steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="relative flex flex-col items-center text-center p-4">
              <div className="flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full ring-8 ring-background mb-6">
                <step.Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
              {step.title !== "4. Achieve Your Goals" && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-border -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
