'use client';

import { useState } from "react";
import ProductsHero from "@/components/products/ProductsHero";
import ProductShowcase from "@/components/products/ProductShowcase";
import CoreFeatures from "@/components/products/CoreFeatures";
import ProductBenefits from "@/components/products/ProductBenefits";
import CustomerSuccess from "@/components/products/CustomerSuccess";
import UseCases from "@/components/products/UseCases";
import ProductVideoDemo from "@/components/products/ProductVideoDemo";
import ProductRoadmap from "@/components/products/ProductRoadmap";
import ProductsCTA from "@/components/products/ProductsCTA";
import TechStackShowcase from "@/components/home/TechStackShowcase";
import { Product } from "@/lib/productsData";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <ProductsHero />
      <ProductShowcase
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />
      <CoreFeatures />
      <ProductBenefits />
      <TechStackShowcase />
      <CustomerSuccess />
      <UseCases />
      <ProductVideoDemo selectedProduct={selectedProduct} />
      <ProductRoadmap />
      <ProductsCTA />
    </>
  );
}
