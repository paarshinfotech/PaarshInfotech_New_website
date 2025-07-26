// src/components/products/details/FeatureGrid.tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Product } from "@/lib/productsData";

interface Feature {
  title: string;
  description: string;
  _id: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Powerful Features, Simply Delivered</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Everything you need to streamline your processes and drive growth, all in one platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ title, description, _id }) => (
            <Card key={_id} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-background text-center">
              <CardHeader className="p-0 items-center">
                <CardTitle className="text-xl text-primary">{title}</CardTitle>
              </CardHeader>
              <div className="p-0 mt-4">
                <CardDescription>{description}</CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}