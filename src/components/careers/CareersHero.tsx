import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersHero() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container text-center md:text-left max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
          Join Our Family – Power Your Career With Us
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80">
          Explore exciting job and internship opportunities at Paarsh Infotech and be part of a team that's building the future of technology.
        </p>
        <Button asChild size="lg" className="mt-8">
            <Link href="#openings">View Openings</Link>
        </Button>
      </div>
    </section>
  );
}
