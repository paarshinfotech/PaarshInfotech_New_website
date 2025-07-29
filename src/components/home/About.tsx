import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Paarsh Infotech Team Collaboration"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="modern office collaboration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-primary uppercase tracking-wider mb-3">
              The Paarsh Difference
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Partner in Digital Innovation
            </h3>
            <p className="text-lg text-foreground/70 mb-8">
              Paarsh Infotech is more than just a software company. We are your strategic partner, dedicated to transforming your ideas into powerful, scalable, and user-centric digital solutions.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="text-lg text-foreground/80">Expert team of certified professionals</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="text-lg text-foreground/80">Agile development for rapid results</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="text-lg text-foreground/80">Transparent communication and collaboration</span>
              </li>
            </ul>
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold">
              <Link href="/about">
                Discover Our Story
                <LuArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
