"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShoppingBag, LineChart, Bot, Rocket } from "lucide-react";
import type { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

type Goal = {
  id: string;
  title: string;
  Icon: LucideIcon;
  description: string;
  services: { name: string; description: string }[];
};

const goals: Goal[] = [
  {
    id: "sell-online",
    title: "Sell Products Online",
    Icon: ShoppingBag,
    description: "Launch a powerful e-commerce platform.",
    services: [
      { name: "E-Commerce Development", description: "Build a robust online store with secure payments." },
      { name: "Logo & Graphic Design", description: "Create a memorable brand identity that stands out." },
      { name: "Digital Marketing", description: "Drive traffic and sales with targeted campaigns." },
    ],
  },
  {
    id: "launch-product",
    title: "Launch a New Product",
    Icon: Rocket,
    description: "Bring your digital product idea to life.",
    services: [
      { name: "Software Development", description: "Create a custom application tailored to your needs." },
      { name: "Mobile App Development", description: "Engage users with a sleek app on iOS and Android." },
      { name: "Product Engineering", description: "Ensure your product is scalable, robust, and market-ready." },
    ],
  },
  {
    id: "grow-business",
    title: "Grow My Business",
    Icon: LineChart,
    description: "Expand your reach and customer base.",
    services: [
      { name: "Social Media Marketing", description: "Build a strong community around your brand." },
      { name: "Omnichannel Consulting", description: "Create a seamless customer experience everywhere." },
      { name: "Analytics & AI/ML", description: "Use data to make smarter business decisions." },
    ],
  },
  {
    id: "automate-ops",
    title: "Automate Operations",
    Icon: Bot,
    description: "Improve efficiency and reduce manual work.",
    services: [
      { name: "Workflow Automation", description: "Streamline repetitive tasks and connect your systems." },
      { name: "Custom Software Development", description: "Build tools to solve your unique operational challenges." },
    ],
  },
];

export default function SolutionFinder() {
  const [openItem, setOpenItem] = useState<string | null>(goals[0].id);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Find Your Solution</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Select a business goal to see how our services can help you achieve it.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 flex flex-col gap-4">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setOpenItem(goal.id)}
                className={cn(
                  "flex items-center gap-4 text-left p-4 rounded-lg border-2 transition-all w-full",
                  openItem === goal.id
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "bg-background hover:bg-muted/50 border-transparent"
                )}
              >
                <goal.Icon className="w-8 h-8 flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg">{goal.title}</p>
                  <p className={cn("text-sm", openItem === goal.id ? "text-primary-foreground/80" : "text-muted-foreground")}>{goal.description}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-2">
            <Accordion
              type="single"
              value={openItem ?? ""}
              onValueChange={setOpenItem}
              className="w-full"
            >
              {goals.map((goal) => (
                <AccordionItem key={goal.id} value={goal.id} className="border-none">
                  <AccordionContent className="pt-0">
                    <div className="bg-background p-8 rounded-lg shadow-lg">
                      <h3 className="text-2xl font-bold text-primary mb-6">Recommended Services for "{goal.title}"</h3>
                      <div className="space-y-6">
                        {goal.services.map((service) => (
                          <div key={service.name} className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                                <ArrowRight className="w-4 h-4 text-accent-foreground" />
                              </div>
                              <div>
                                <p className="font-semibold text-lg text-primary">{service.name}</p>
                                <p className="text-muted-foreground">{service.description}</p>
                              </div>
                          </div>
                        ))}
                      </div>
                       <Button asChild className="mt-8">
                         <Link href="/quote">Request a Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
                       </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
