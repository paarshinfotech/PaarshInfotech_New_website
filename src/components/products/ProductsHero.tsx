
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuLayers,
  LuBriefcase,
  LuUsers,
  LuGraduationCap,
} from "react-icons/lu";
import { useGetProductsQuery } from "@/services/api";
import { Product } from "@/lib/productsData";
import { iconMap } from "@/lib/iconsMap";
import { useEffect, useState } from "react";

type IconType = typeof LuArrowRight;

// Helper function to get icon component safely
const getProductIcon = (productName: string) => {
    try {
      const IconComponent = iconMap?.[productName];
      if (IconComponent && typeof IconComponent === 'function') {
        return IconComponent;
      }
      const DefaultIcon = iconMap?.["Default"];
      if (DefaultIcon && typeof DefaultIcon === 'function') {
        return DefaultIcon;
      }
      return LuLayers;
    } catch (error) {
      console.warn(`Icon not found for product: ${productName}`, error);
      return LuLayers;
    }
  };

export default function ProductsHero() {

  const { data: productsData, isLoading, isError } = useGetProductsQuery(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productsData?.data) {
        const publishedProducts = productsData.data.filter((p: Product) => p.published);
        // Duplicate the products to create a seamless loop
        setProducts([...publishedProducts, ...publishedProducts]);
    }
  }, [productsData]);


  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative container max-w-6xl z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              A Suite of Solutions to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Power Your Business</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/80 max-w-2xl">
              From customer relationships to internal operations, our products are
              designed to streamline your workflow, boost productivity, and drive
              growth.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-md px-8 py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="#products">
                  Explore Products
                  <LuArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md px-8 py-6 text-base font-semibold border-2">
                <Link href="/quote">Request a Demo</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 w-full max-w-xs mx-auto"
          >
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
            <div className="h-full w-full overflow-hidden">
                <motion.div
                    className="flex flex-col gap-4"
                    animate={{ y: ['0%', '-100%'] }}
                    transition={{
                        duration: products.length * 1.5,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {products.map((product : Product, index : number) => {
                        const Icon = getProductIcon(product.name);
                        return (
                        <motion.div
                            key={`${product._id}-${index}`}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-md"
                            initial={{ scale: 0.8, opacity: 0.7 }}
                            animate={{ scale: [0.8, 1, 0.8], opacity: [0.7, 1, 0.7] }}
                             transition={{
                                duration: 3,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: (products.length - 1) * 1.5,
                                delay: index * 0.5
                            }}
                        >
                            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{product.name}</span>
                        </motion.div>
                        );
                    })}
                </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
