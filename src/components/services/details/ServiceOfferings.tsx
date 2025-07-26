import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons"; // Import IconType
import { LuCheck } from "react-icons/lu";

interface ServiceOfferingsProps {
  offerings: {
    title: string;
    description: string;
    IconComponent?: IconType; // Updated interface
  }[];
}

export default function ServiceOfferings({ offerings }: ServiceOfferingsProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">What We Offer</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A detailed look at the key features and services included in our offering.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering) => (
            <div key={offering.title} className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1.5 p-1 bg-primary/10 rounded-full">
                {offering.IconComponent ? (
                  <offering.IconComponent className="w-5 h-5 text-primary" />
                ) : (
                  <LuCheck className="w-5 h-5 text-primary" /> // Fallback icon
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{offering.title}</h3>
                <p className="text-muted-foreground">{offering.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}