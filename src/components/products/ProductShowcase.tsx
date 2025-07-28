"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import { FaCode, FaMobileAlt, FaRobot } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { useGetProductsQuery } from "@/services/api";
import { Product } from "@/lib/productsData";
import { iconMap, iconOptions } from "@/lib/iconsMap";

// Skeleton component for loading state
const ProductShowcaseSkeleton = () => {
  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-10 bg-gray-200 rounded w-32"></div>
          ))}
        </div>
        <Card className="overflow-hidden shadow-lg border-primary/10">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
              <div className="space-y-4 mb-8">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="relative min-h-[300px] md:min-h-[500px] order-1 md:order-2 bg-gray-200"></div>
          </div>
        </Card>
      </div>
    </section>
  );
};

// // Map product names to icons
// const iconMap: Record<string, React.ComponentType> = {
//   "Web Development": FaCode,
//   "Mobile App": FaMobileAlt,
//   "AI Platform": FaRobot,
// };

export default function ProductShowcase() {
  const { data: productsData, isLoading, isError, error } = useGetProductsQuery(undefined);

  // Initialize activeProduct as null and set it when products are available
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Set activeProduct when productsData is available
  useEffect(() => {
    if (productsData?.data?.length) {
      const publishedProducts = productsData.data.filter((p: Product) => p.published);
      if (publishedProducts.length > 0 && !activeProduct) {
        setActiveProduct(publishedProducts[0]);
      }
    }
  }, [productsData, activeProduct]);

  // Handle loading state
  if (isLoading) {
    return <ProductShowcaseSkeleton />;
  }

  // Handle error state
  if (isError) {
    return (
      <section id="products" className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
            <h3 className="text-red-800 font-medium">Error loading products</h3>
            <p className="text-red-600 mt-1">
              {error?.data?.error || "Failed to load products. Please try again."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Ensure productsData.data is an array, fallback to empty array if undefined
  const publishedProducts = productsData?.data?.filter((p: Product) => p.published) || [];

  // Handle no published products
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
          {publishedProducts.map((product: Product) => {
            const ProductIcon = iconMap[product.name] || FaCode; // Fallback to FaCode
            return (
              <Button
                key={product._id}
                variant={activeProduct?._id === product._id ? "default" : "outline"}
                onClick={() => setActiveProduct(product)}
                className="capitalize"
              >
                <ProductIcon className="mr-2 h-4 w-4" />
                {product.name}
              </Button>
            );
          })}
        </div>

        {activeProduct && (
          <Card className="overflow-hidden shadow-lg border-primary/10">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                {/* {(() => {
                  const ActiveProductIcon = iconMap[activeProduct.name] || FaCode;
                  return <ActiveProductIcon className="w-12 h-12 text-primary mb-4" />;
                })()} */}
                <h3 className="text-3xl font-bold text-primary">{activeProduct.name}</h3>
                <p className="text-lg font-semibold text-accent mb-4">{activeProduct.tagline}</p>
                <p className="text-muted-foreground mb-6">{activeProduct.description}</p>
                <div className="space-y-4 mb-8">
                  {activeProduct.features.slice(0, 3).map((feature: Product["features"][0]) => (
                    <div key={feature.title} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1 p-1 bg-primary/10 rounded-full">
                        <LuCheck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild className="self-start">
                  <Link href={`/products/${activeProduct._id}`}>
                    Learn More <LuArrowRight className="ml-2 w-4 h-4" />
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
        )}
      </div>
    </section>
  );
}