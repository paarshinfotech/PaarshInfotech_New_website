import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuZap, LuTrendingUp, LuUsers } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import type { IconType } from "react-icons";

const outcomesData: {
  title: string;
  metric: string;
  description: string;
  Icon: IconType;
}[] = [
  {
    title: "Increased Lead Generation",
    metric: "+75%",
    description: "Through targeted digital marketing and SEO strategies.",
    Icon: LuTrendingUp,
  },
  {
    title: "Operational Efficiency",
    metric: "+40%",
    description: "By automating workflows and implementing custom software.",
    Icon: LuZap,
  },
  {
    title: "Higher User Engagement",
    metric: "+60%",
    description: "With intuitive UI/UX design and compelling mobile apps.",
    Icon: LuUsers,
  },
  {
    title: "Improved Conversions",
    metric: "+35%",
    description: "Via optimized e-commerce platforms and user journeys.",
    Icon: FiCheckCircle,
  },
];

export default function ExpectedOutcomes() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Visualize the Outcome
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We don't just deliver services; we deliver tangible results that
            drive business growth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outcomesData.map((outcome) => (
            <Card
              key={outcome.title}
              className="text-center p-6 border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader className="p-0 items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <outcome.Icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-4xl font-extrabold text-primary">
                  {outcome.metric}
                </p>
                <CardTitle className="text-xl mt-2">{outcome.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <p className="text-muted-foreground">{outcome.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
