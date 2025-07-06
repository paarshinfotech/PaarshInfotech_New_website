import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Complete Technology Partner",
    description: "We provide end-to-end solutions, from concept to deployment and beyond, ensuring your project's success.",
  },
  {
    title: "100% Customer References",
    description: "Our track record speaks for itself. We proudly maintain excellent relationships and satisfaction with all our clients.",
  },
  {
    title: "Fast, Scalable, and Reliable",
    description: "We build robust applications that perform under pressure and scale with your business needs.",
  },
  {
    title: "The Emerging Tech Experts",
    description: "Stay ahead of the curve with our expertise in AI, ML, and other cutting-edge technologies.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Why Choose Us?</h2>
          <p className="mt-4 text-lg text-foreground/70">
            We are more than just a software company. We are your partners in innovation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary mb-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
