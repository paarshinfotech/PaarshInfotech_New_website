'use client';

import { notFound, useParams } from 'next/navigation';
import { Product } from '@/lib/productsData';
import { useGetProductsQuery } from '@/services/api';
import ProductHero from '@/components/products/details/ProductHero';
import ProductDemoVideo from '@/components/products/details/ProductDemoVideo';
import FeatureGrid from '@/components/products/details/FeatureGrid';
import HowItWorks from '@/components/products/details/HowItWorks';
import UseCases from '@/components/products/details/UseCases';
import IntegrationLogos from '@/components/products/details/IntegrationLogos';
import Testimonial from '@/components/products/details/Testimonial';
import StatsHighlight from '@/components/products/details/StatsHighlight';
import ProductGallery from '@/components/products/details/ProductGallery';
import ProductCTA from '@/components/products/details/ProductCTA';


export default function ProductSlugPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: productsData, isLoading, error } = useGetProductsQuery(undefined);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error || !productsData) {
    console.error('Error fetching products:', error);
    return <div>Error loading product</div>;
  }

  // Access the products array (adjust based on your API response structure)
  const Products = productsData.data || productsData; // Fallback to productsData if no data field

  // Debug: Log id and Products to verify
  console.log('Product ID:', id);
  console.log('Products Data:', Products);

  // Ensure Products is an array
  if (!Array.isArray(Products)) {
    console.error('Products is not an array:', Products);
    return <div>Invalid product data</div>;
  }

  const product = Products.find((p: Product) => p._id === id);

  if (!product || !product.published) {
    notFound();
  }

  return (
    <>
      <ProductHero product={product} />
      <ProductDemoVideo />
      <FeatureGrid features={product.features} />
      <HowItWorks />
      <UseCases />
      <IntegrationLogos />
      <Testimonial />
      <StatsHighlight />
      <ProductGallery gallery={product.gallery} />
      <ProductCTA />
    </>
  );
}