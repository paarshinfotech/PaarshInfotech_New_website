import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { growthOpportunitiesData } from "@/lib/careersData";

export default function GrowthOpportunities() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Your Pathway to Growth
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We are committed to your professional development and provide a
            clear path for advancement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {growthOpportunitiesData.map(({ title, description, Icon }) => (
            <Card
              key={title}
              className="text-center p-6 group transition-all duration-300 ease-in-out hover:bg-background hover:shadow-xl hover:-translate-y-2"
            >
              <CardHeader className="p-0">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-accent">
                    <Icon className="w-8 h-8 text-primary transition-colors group-hover:text-accent-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl text-primary mb-2">
                  {title}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
