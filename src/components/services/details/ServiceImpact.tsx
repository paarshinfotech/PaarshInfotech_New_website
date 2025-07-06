import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ServiceImpactProps {
  outcomes: {
    title: string;
    metric: string;
    description: string;
    Icon: LucideIcon;
  }[];
}

export default function ServiceImpact({ outcomes }: ServiceImpactProps) {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Expected Outcomes</h2>
                    <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
                        We deliver tangible results that drive business growth and operational efficiency.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {outcomes.map((outcome) => (
                        <Card key={outcome.title} className="flex items-center p-6 gap-6 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="p-4 bg-primary/10 rounded-full">
                                <outcome.Icon className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <p className="text-3xl font-extrabold text-primary">{outcome.metric}</p>
                                <CardTitle className="text-xl mt-1">{outcome.title}</CardTitle>
                                <p className="text-muted-foreground mt-2">{outcome.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
