import { notFound } from 'next/navigation';
import { productsData } from '@/lib/productsData';
import type { Metadata } from 'next';

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

interface ProductSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return productsData.filter(p => p.published).map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }: ProductSlugPageProps): Promise<Metadata> {
  const { slug } = await params; // Await params to access slug
  const product = productsData.find((p) => p.id === slug);

  if (!product || !product.published) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Paarsh Infotech Products`,
    description: product.description,
  };
}

export default async function ProductSlugPage({ params }: ProductSlugPageProps) {
  const { slug } = await params; // Await params to access slug
  const product = productsData.find((p) => p.id === slug);

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