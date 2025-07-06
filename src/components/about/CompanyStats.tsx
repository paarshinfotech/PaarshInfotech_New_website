import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, BarChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stats: { value: string; label: string; Icon: LucideIcon }[] = [
    { value: "50+", label: "Remote Sale Experts", Icon: Users },
    { value: "8+", label: "New Clients per Month", Icon: Briefcase },
    { value: "9+", label: "Requests per Week", Icon: BarChart },
];

export default function CompanyStats() {
    return (
        <section className="py-16 md:py-24 bg-secondary">
            <div className="container max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <div className="p-4 bg-primary/10 rounded-full">
                                        <stat.Icon className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <CardTitle className="text-lg font-medium text-muted-foreground">{stat.label}</CardTitle>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
