"use client";

import { notFound, useParams } from "next/navigation";
import { useGetServicesQuery } from "@/services/api";
import type { IconType } from "react-icons";
import {
  FaCode,
  FaUsers,
  FaGem,
  FaBolt,
  FaAward,
  FaPen,
  FaSearch,
  FaRocket,
  FaLifeRing,
  FaCheckCircle
} from "react-icons/fa";

// Components
import ServiceOverview from "@/components/services/details/ServiceOverview";
import ServiceOfferings from "@/components/services/details/ServiceOfferings";
import WhyChooseUsService from "@/components/services/details/WhyChooseUsService";
import TechStack from "@/components/services/details/TechStack";
import OurProcessService from "@/components/services/details/OurProcessService";
import ServiceImpact from "@/components/services/details/ServiceImpact";
import ClientTestimonial from "@/components/services/details/ClientTestimonial";
import ProjectGallery from "@/components/services/details/ProjectGallery";
import IndustriesServed from "@/components/services/details/IndustriesServed";
import CallToActionBox from "@/components/services/details/CallToActionBox";

// Map icon names to React icon components
const iconMap: Record<string, IconType> = {
  Code: FaCode,
  Users: FaUsers,
  Gem: FaGem,
  Zap: FaBolt,
  Award: FaAward,
  PenTool: FaPen,
  Search: FaSearch,
  Rocket: FaRocket,
  LifeBuoy: FaLifeRing,
  CheckCircle: FaCheckCircle,
};

// Helper function to get icon component from string
const getIconComponent = (iconKey: string | null | undefined): IconType => {
  if (!iconKey || !iconMap[iconKey]) {
    return iconMap.Code; // Default fallback icon
  }
  return iconMap[iconKey];
};

// Define the Service interface (updated to match your data structure)
interface Service {
  _id: string;
  id?: string;
  slug: string;
  title: string;
  description: string;
  published: boolean;
  Icon: string | null; // Changed from IconType to string
  overview: string;
  heroImageBase64: string;
  offerings: { title: string; description: string; Icon: string | null }[]; // Updated Icon type
  whyChooseUs: { title: string; description: string; Icon: string | null }[]; // Updated Icon type
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  process: { title: string; description: string; Icon: string | null }[]; // Updated Icon type
  impact: { title: string; metric: string; description: string; Icon: string | null }[]; // Updated Icon type
  testimonial: { quote: string; name: string; role: string; avatarBase64: string };
  gallery: { src: string; alt: string; dataAiHint: string }[];
  industries: string[];
}

export default function ServiceSlugPage() {
  const params = useParams();
  const id = params.id as string;

  // Log for debugging
  console.log("Service ID:", id);

  // Fetch services data
  const { data: serviceData, isLoading, isError } = useGetServicesQuery(undefined);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError || !serviceData) {
    return <div>Error loading services. Please try again later.</div>;
  }

  // Extract services array
  const servicesData: Service[] = serviceData?.data || [];

  // Log services data for debugging
  console.log("Services Data:", servicesData);

  // Find the service by ID
  const service = servicesData.find((s) => s._id === id);

  // Trigger 404 if service is not found
  if (!service) {
    console.log("Service not found for ID:", id);
    notFound();
  }

  // Provide default values to prevent undefined errors
  const safeService: Service = {
    _id: service._id || "",
    id: service.id || "",
    slug: service.slug || "",
    title: service.title || "Untitled Service",
    description: service.description || "No description available",
    published: service.published ?? false,
    Icon: service.Icon || null,
    overview: service.overview || "No overview available",
    heroImageBase64: service.heroImageBase64 || "/default-image.jpg",
    offerings: Array.isArray(service.offerings)
      ? service.offerings.map(offering => ({
          ...offering,
          Icon: offering.Icon || null
        }))
      : [{ title: "", description: "", Icon: null }],
    whyChooseUs: Array.isArray(service.whyChooseUs)
      ? service.whyChooseUs.map(reason => ({
          ...reason,
          Icon: reason.Icon || null
        }))
      : [{ title: "", description: "", Icon: null }],
    techStack: {
      frontend: Array.isArray(service.techStack?.frontend) ? service.techStack.frontend : [],
      backend: Array.isArray(service.techStack?.backend) ? service.techStack.backend : [],
      database: Array.isArray(service.techStack?.database) ? service.techStack.database : [],
      tools: Array.isArray(service.techStack?.tools) ? service.techStack.tools : [],
    },
    process: Array.isArray(service.process)
      ? service.process.map(step => ({
          ...step,
          Icon: step.Icon || null
        }))
      : [{ title: "", description: "", Icon: null }],
    impact: Array.isArray(service.impact)
      ? service.impact.map(outcome => ({
          ...outcome,
          Icon: outcome.Icon || null
        }))
      : [{ title: "", metric: "", description: "", Icon: null }],
    testimonial: service.testimonial || {
      quote: "No testimonial available",
      name: "",
      role: "",
      avatarBase64: "",
    },
    gallery: Array.isArray(service.gallery)
      ? service.gallery
      : [{ src: "", alt: "", dataAiHint: "" }],
    industries: Array.isArray(service.industries) ? service.industries : [],
  };

  // Transform data for components that need IconType components
  const transformedService = {
    ...safeService,
    offerings: safeService.offerings.map(offering => ({
      ...offering,
      IconComponent: getIconComponent(offering.Icon)
    })),
    whyChooseUs: safeService.whyChooseUs.map(reason => ({
      ...reason,
      IconComponent: getIconComponent(reason.Icon)
    })),
    process: safeService.process.map(step => ({
      ...step,
      IconComponent: getIconComponent(step.Icon)
    })),
    impact: safeService.impact.map(outcome => ({
      ...outcome,
      IconComponent: getIconComponent(outcome.Icon)
    }))
  };

  return (
    <>
      <ServiceOverview
        title={transformedService.title}
        overview={transformedService.overview}
        heroImage={transformedService.heroImageBase64}
      />
      <ServiceOfferings offerings={transformedService.offerings} />
      <WhyChooseUsService reasons={transformedService.whyChooseUs} />
      <TechStack techStack={transformedService.techStack} />
      <OurProcessService steps={transformedService.process} />
      <ServiceImpact outcomes={transformedService.impact} />
      <ClientTestimonial testimonial={transformedService.testimonial} />
      <ProjectGallery gallery={transformedService.gallery} />
      <IndustriesServed industries={transformedService.industries} />
      <CallToActionBox />
    </>
  );
}