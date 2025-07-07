import { introSectionData } from "@/lib/careersData";
import Image from "next/image";

export default function IntroSection() {
    const { ceoQuote, ceoName, ceoTitle, imageSrc, imageHint } = introSectionData;
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary tracking-tight">A Culture of Innovation and Growth</h2>
            <p className="text-lg text-muted-foreground">
              At Paarsh Infotech, we believe our people are our greatest asset. We foster a collaborative and inclusive work environment where creativity thrives and every team member has the opportunity to learn, grow, and make a meaningful impact.
            </p>
             <blockquote className="text-xl italic text-foreground/80 border-l-4 border-accent pl-6">
              <p>{ceoQuote}</p>
              <footer className="mt-4 text-base not-italic">
                <span className="font-semibold text-primary">{ceoName}</span>, <span className="text-muted-foreground">{ceoTitle}</span>
              </footer>
            </blockquote>
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <Image 
                src={imageSrc}
                alt="Paarsh Infotech Team"
                fill
                className="object-cover"
                data-ai-hint={imageHint}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
