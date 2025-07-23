
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="relative py-24 md:py-36 bg-secondary text-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1920x800.png"
          alt="Students collaborating in a modern lab"
          fill
          className="object-cover"
          data-ai-hint="students collaborating"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative container max-w-4xl z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
          Centers of Excellence: Bridging Academia and Industry
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/80">
          We partner with leading educational institutions to foster innovation,
          nurture talent, and prepare the next generation of tech leaders.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="#partners">
            Explore Our Partnerships <LuArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
