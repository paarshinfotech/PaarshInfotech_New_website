import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-sm font-semibold text-accent-foreground uppercase tracking-wider mb-2">
              Who We Are
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              About Us
            </h3>
            <p className="text-foreground/80 mb-4">
              Paarsh Infotech Pvt Ltd is a leading software development company
              based in Nashik. We specialize in creating innovative and custom
              software solutions that drive business growth. Our team of experts
              is dedicated to delivering excellence and exceeding client
              expectations.
            </p>
            <p className="text-foreground/80 mb-6">
              With a focus on cutting-edge technologies and a commitment to
              quality, we help businesses navigate the complexities of the
              digital world.
            </p>
            <Button asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="w-full h-80 relative rounded-lg overflow-hidden group">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Our Team"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="team office"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
