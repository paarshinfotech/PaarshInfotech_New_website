import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingBag, Landmark, HeartPulse, Building } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const useCases: { title: string; Icon: LucideIcon }[] = [
    { title: "Retail & E-commerce", Icon: ShoppingBag },
    { title: "Financial Services", Icon: Landmark },
    { title: "Healthcare", Icon: HeartPulse },
    { title: "Real Estate", Icon: Building },
];

export default function UseCases() {
    return (
        <section className="py-16 md:py-24 bg-secondary">
            <div className="container max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Perfect for Any Industry</h2>
                    <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
                        Our platform is flexible and powerful enough to adapt to the unique needs of your business, no matter the industry.
                    </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {useCases.map((useCase) => (
                        <Card key={useCase.title} className="text-center p-8 shadow-sm hover:shadow-lg transition-shadow bg-background">
                            <div className="flex justify-center mb-4">
                                <useCase.Icon className="w-12 h-12 text-primary" />
                            </div>
                            <CardTitle className="text-lg text-primary">{useCase.title}</CardTitle>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
