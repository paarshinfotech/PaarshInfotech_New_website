import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function AdminQuote() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-4xl">
        <Card className="p-8 shadow-lg bg-secondary">
          <CardContent className="text-center p-0">
            <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl italic text-foreground/80">
              "There is probably a perverse pride in my administration... that we were going to do the right thing, even if short-term it was unpopular. And I think anybody who's occupied this office has to remember that success is determined by an intersection in policy and politics and that you can't be neglecting of marketing and public opinion."
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
