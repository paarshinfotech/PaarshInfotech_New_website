
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuArrowRight, LuCheck, LuPackage } from "react-icons/lu";
import { useGetProductsQuery } from "@/services/api";
import { Product } from "@/lib/productsData";
import { iconMap } from "@/lib/iconsMap";

// Skeleton component for loading state
const ProductShowcaseSkeleton = () => {
  return (
    <section id="products" className="py-12 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-10">
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-3 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
          ))}
        </div>
        <div className="bg-gray-100 rounded-xl p-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 mb-5"></div>
              <div className="space-y-3">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-1/3 h-48 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get icon component safely
const getProductIcon = (productName: string) => {
  try {
    // First try to get the icon by product name
    const IconComponent = iconMap?.[productName];
    if (IconComponent && typeof IconComponent === 'function') {
      return IconComponent;
    }
    
    // Then try to get the default icon
    const DefaultIcon = iconMap?.["Default"];
    if (DefaultIcon && typeof DefaultIcon === 'function') {
      return DefaultIcon;
    }
    
    // Fallback to LuPackage if everything else fails
    return LuPackage;
  } catch (error) {
    console.warn(`Icon not found for product: ${productName}`, error);
    return LuPackage;
  }
};

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
      <section id="products" className="py-12 bg-background">
        <div className="container max-w-7xl">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
            <h3 className="text-red-800 font-medium">Error loading products</h3>
            <p className="text-red-600 text-sm mt-1">
              Failed to load products. Please try again later.
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
      <section id="products" className="py-12 bg-background">
        <div className="container max-w-7xl text-center">
          <p className="text-muted-foreground text-sm">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 bg-background">
      <div className="container max-w-7xl">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Our <span className="bg-gradient-to-r from-blue-900 to-blue-900 bg-clip-text text-transparent">Flagship Products</span>
          </h2>
          <p className="text-base text-foreground/70 max-w-2xl mx-auto">
            Discover our powerful software solutions designed for modern businesses.
          </p>
        </motion.div>

        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {publishedProducts.map((product: Product, index: number) => {
            const ProductIcon = getProductIcon(product.name);
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  variant={activeProduct?._id === product._id ? "default" : "outline"}
                  onClick={() => setActiveProduct(product)}
                  className="capitalize rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 hover:scale-105"
                  size="sm"
                >
                  <ProductIcon className="mr-1.5 h-3.5 w-3.5" />
                  {product.name}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {activeProduct && (
          <motion.div
            key={activeProduct._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row-reverse gap-6">
              <div className="flex-shrink-0 w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden relative">
                <Image
                  src={activeProduct.heroImageBase64}
                  alt={`${activeProduct.name} dashboard`}
                  fill
                  className="object-cover"
                  data-ai-hint="dashboard screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">{activeProduct.name}</h3>
                <p className="text-sm font-medium text-primary mb-3">{activeProduct.tagline}</p>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {activeProduct.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {activeProduct.features.slice(0, 2).map((feature: Product["features"][0], idx: number) => (
                    <motion.div 
                      key={feature.title} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * idx }}
                    >
                      <div className="flex-shrink-0 mt-0.5 p-1.5 bg-gradient-to-br from-blue-100 to-purple-100 rounded-md">
                        <LuCheck className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Button asChild size="sm" className="rounded-full px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-900 to-blue-900 hover:from-blue-950 hover:to-blue-950">
                  <Link href={`/products/${activeProduct._id}`} className="flex items-center">
                    Learn More <LuArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
