
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { coreFeatures } from "@/lib/productsData";

export default function CoreFeatures() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">The Core of Our Platform</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Every product we build is founded on these core principles to ensure quality, security, and performance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreFeatures.map(({ title, description, Icon }) => (
            <Card key={title} className="text-center p-6 group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-background">
              <CardHeader className="p-0 items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent">
                  <Icon className="w-8 h-8 text-primary transition-colors group-hover:text-accent-foreground" />
                </div>
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
