
import ProductsHero from "@/components/products/ProductsHero";
import ProductShowcase from "@/components/products/ProductShowcase";
import CoreFeatures from "@/components/products/CoreFeatures";
import ProductBenefits from "@/components/products/ProductBenefits";
import IntegrationShowcase from "@/components/products/IntegrationShowcase";
import CustomerSuccess from "@/components/products/CustomerSuccess";
import UseCases from "@/components/products/UseCases";
import ProductVideoDemo from "@/components/products/ProductVideoDemo";
import ProductRoadmap from "@/components/products/ProductRoadmap";
import ProductsCTA from "@/components/products/ProductsCTA";

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductShowcase />
      <CoreFeatures />
      <ProductBenefits />
      <IntegrationShowcase />
      <CustomerSuccess />
      <UseCases />
      <ProductVideoDemo />
      <ProductRoadmap />
      <ProductsCTA />
    </>
  );
}
