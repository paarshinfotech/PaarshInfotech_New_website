import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Zap, Gem, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const features: { title: string; description: string, Icon: LucideIcon }[] = [
  {
    title: "Complete Technology Partner",
    description: "We provide end-to-end solutions, from concept to deployment and beyond, ensuring your project's success.",
    Icon: Gem,
  },
  {
    title: "100% Customer References",
    description: "Our track record speaks for itself. We proudly maintain excellent relationships and satisfaction with all our clients.",
    Icon: Award,
  },
  {
    title: "Fast, Scalable, and Reliable",
    description: "We build robust applications that perform under pressure and scale with your business needs.",
    Icon: Zap,
  },
  {
    title: "The Emerging Tech Experts",
    description: "Stay ahead of the curve with our expertise in AI, ML, and other cutting-edge technologies.",
    Icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Why Choose Us?</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We are more than just a software company. We are your partners in innovation, committed to delivering excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description, Icon }) => (
            <Card key={title} className="text-center p-6 group transition-all duration-300 ease-in-out hover:bg-secondary/50 hover:shadow-xl hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="flex justify-center mb-6">
                   <div className="p-4 bg-accent/10 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-accent">
                     <Icon className="w-8 h-8 text-primary transition-colors group-hover:text-accent-foreground" />
                   </div>
                </div>
                <CardTitle className="text-xl text-primary mb-2">{title}</CardTitle>
                <CardDescription className="leading-relaxed">{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
