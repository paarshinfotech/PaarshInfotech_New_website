// src/components/products/details/ProductHero.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuArrowRight, LuBox } from "react-icons/lu";
import type { Product } from "@/lib/productsData";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="relative py-20 md:py-28 bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative container grid lg:grid-cols-2 gap-12 items-center max-w-7xl z-10">
        <motion.div 
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-background border rounded-full px-4 py-2 mb-6 shadow-sm">
            <LuBox className="w-6 h-6 text-primary" />
            <span className="font-bold text-primary">{product.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
            {product.tagline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto lg:mx-0">
            {product.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Button asChild size="lg" className="rounded-md px-8 py-6 text-base font-semibold">
              <Link href="/quote">
                Request a Demo
                <LuArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-md px-8 py-6 text-base font-semibold">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative aspect-video w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full h-full rounded-xl shadow-2xl shadow-primary/20 border-4 border-white/50 overflow-hidden">
             <Image 
              src={product.heroImageBase64 || "https://placehold.co/1280x720.png"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
