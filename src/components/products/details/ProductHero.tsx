import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/productsData";

interface ProductHeroProps {
    product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="relative py-24 md:py-36 bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative container text-center max-w-4xl z-10">
        <div className="inline-flex items-center gap-3 bg-background border rounded-full px-4 py-2 mb-6">
            <product.Icon className="w-6 h-6 text-primary" />
            <span className="font-bold text-primary">{product.name}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
          {product.tagline}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80">
          {product.description}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/quote">
              Request a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
