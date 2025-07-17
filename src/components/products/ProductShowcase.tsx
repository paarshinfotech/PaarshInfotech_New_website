
"use client";

import { useState } from "react";
import Image from "next/image";
import { productsData } from "@/lib/productsData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductShowcase() {
  const publishedProducts = productsData.filter(p => p.published);
  const [activeProduct, setActiveProduct] = useState(publishedProducts[0]);

  if (publishedProducts.length === 0) {
    return (
      <section id="products" className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl text-center">
          <p className="text-muted-foreground">No products are currently available. Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Flagship Products</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Discover our suite of powerful, integrated software solutions designed for modern businesses.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {publishedProducts.map((product) => (
            <Button
              key={product.id}
              variant={activeProduct.id === product.id ? "default" : "outline"}
              onClick={() => setActiveProduct(product)}
              className="capitalize"
            >
              <product.Icon className="mr-2 h-4 w-4" />
              {product.name}
            </Button>
          ))}
        </div>

        <Card className="overflow-hidden shadow-lg border-primary/10">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
              <activeProduct.Icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-3xl font-bold text-primary">{activeProduct.name}</h3>
              <p className="text-lg font-semibold text-accent mb-4">{activeProduct.tagline}</p>
              <p className="text-muted-foreground mb-6">{activeProduct.description}</p>
              
              <div className="space-y-4 mb-8">
                {activeProduct.features.slice(0, 3).map(feature => (
                    <div key={feature.title} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 p-1 bg-primary/10 rounded-full">
                           <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold">{feature.title}</p>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                ))}
              </div>

              <Button asChild className="self-start">
                <Link href={`/products/${activeProduct.id}`}>
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative min-h-[300px] md:min-h-[500px] order-1 md:order-2">
              <Image 
                src={activeProduct.heroImage} 
                alt={`${activeProduct.name} dashboard`}
                fill
                className="object-cover"
                data-ai-hint="dashboard screen"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
