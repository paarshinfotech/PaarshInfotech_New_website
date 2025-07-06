import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DirectorCard() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container flex justify-center">
        <Card className="max-w-sm overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="relative h-80 w-full">
            <Image 
              src="https://placehold.co/400x400.png" 
              alt="Mr. Kantilal B. Pagare" 
              fill 
              className="object-cover" 
              data-ai-hint="professional man" 
            />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Mr. Kantilal B. Pagare</CardTitle>
            <CardDescription className="text-base text-accent font-semibold">Director</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
