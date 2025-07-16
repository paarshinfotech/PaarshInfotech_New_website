
import Image from "next/image";
import { PlayCircle } from "lucide-react";

export default function ProductVideoDemo() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">See Our Products in Action</h2>
        <p className="text-lg text-foreground/70 mb-12 max-w-3xl mx-auto">
          Watch a quick overview of how our integrated suite can transform your business operations.
        </p>
        <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-primary/20 group">
          <Image
            src="https://placehold.co/1280x720.png"
            alt="Product Suite Demo"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="software demo"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <PlayCircle className="w-20 h-20 text-white/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
          </div>
           <div className="absolute bottom-0 left-0 p-6">
                <p className="text-xl md:text-2xl font-semibold text-white italic drop-shadow-lg">
                    "Efficiency, simplified."
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
