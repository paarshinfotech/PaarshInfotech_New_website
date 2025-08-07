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

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

type IconType = typeof LuArrowRight;

export default function ProductsHero() {
  // Map API product names to icons
  const productIcons: { [key: string]: IconType } = {
    "GlowvitaSalon": LuUsers,
    "PaarshEdu Product": LuGraduationCap,
    "Paarsh CRM": LuUsers,
    "Paarsh HRMS": LuBriefcase,
    "Paarsh ERP": LuLayers,
    "Paarsh E-Learn": LuGraduationCap,
  };

  const { data: productsData, isLoading, isError } = useGetProductsQuery(undefined);

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
              A Suite of Solutions to <span className="bg-gradient-to-r from-blue-900 to-blue-900 bg-clip-text text-transparent">Power Your Business</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/80 max-w-2xl">
              From customer relationships to internal operations, our products are
              designed to streamline your workflow, boost productivity, and drive
              growth.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-md px-8 py-6 text-base font-semibold bg-gradient-to-r from-blue-900 to-blue-900 hover:from-blue-900 hover:to-blue-900">
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-md p-8 shadow-xl border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Flagship Products</h3>
            {isLoading ? (
              <div>Loading products...</div>
            ) : isError ? (
              <div>Error loading products</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {productsData?.data?.map((product : Product, index : number) => {
                  const Icon = productIcons[product.name] || LuLayers; // Fallback to LuLayers if no icon match
                  return (
                    <motion.div
                      key={product._id}
                      className="flex items-center gap-3 p-2 rounded-md bg-white border border-gray-100 hover:border-primary/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-md">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}