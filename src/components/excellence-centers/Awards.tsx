
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { awards } from "@/lib/excellenceCentersData";
import { Badge } from "@/components/ui/badge";

export default function Awards() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Awards & Recognitions
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Celebrating the achievements and impact of our collaborative
            efforts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award) => (
            <Card
              key={award.title}
              className="flex flex-col items-center text-center p-6 group hover:shadow-xl transition-shadow"
            >
              <CardHeader className="p-0">
                <div className="mb-4">
                  <award.Icon className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-xl text-primary">
                  {award.title}
                </CardTitle>
                <Badge variant="outline" className="mt-2">{award.year}</Badge>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <p className="text-muted-foreground">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
