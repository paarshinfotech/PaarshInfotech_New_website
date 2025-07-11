import { notFound } from 'next/navigation';
import { servicesData } from '@/lib/servicesData';
import type { Metadata } from 'next';

import ServiceOverview from '@/components/services/details/ServiceOverview';
import ServiceOfferings from '@/components/services/details/ServiceOfferings';
import WhyChooseUsService from '@/components/services/details/WhyChooseUsService';
import TechStack from '@/components/services/details/TechStack';
import OurProcessService from '@/components/services/details/OurProcessService';
import ServiceImpact from '@/components/services/details/ServiceImpact';
import ClientTestimonial from '@/components/services/details/ClientTestimonial';
import ProjectGallery from '@/components/services/details/ProjectGallery';
import IndustriesServed from '@/components/services/details/IndustriesServed';
import CallToActionBox from '@/components/services/details/CallToActionBox';

interface ServiceSlugPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceSlugPageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Paarsh Infotech`,
    description: service.overview,
  };
}

export default function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceOverview title={service.title} overview={service.overview} heroImage={service.heroImage} />
      <ServiceOfferings offerings={service.offerings} />
      <WhyChooseUsService reasons={service.whyChooseUs} />
      <TechStack techStack={service.techStack} />
      <OurProcessService steps={service.process} />
      <ServiceImpact outcomes={service.impact} />
      <ClientTestimonial testimonial={service.testimonial} />
      <ProjectGallery gallery={service.gallery} />
      <IndustriesServed industries={service.industries} />
      <CallToActionBox />
    </>
  );
}
