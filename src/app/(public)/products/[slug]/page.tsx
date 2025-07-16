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
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }: ProductSlugPageProps): Promise<Metadata> {
  const product = productsData.find((p) => p.id === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Paarsh Infotech Products`,
    description: product.description,
  };
}

export default function ProductSlugPage({ params }: ProductSlugPageProps) {
  const product = productsData.find((p) => p.id === params.slug);

  if (!product) {
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
