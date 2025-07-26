
import { LuCode, LuServer, LuSmartphone, LuShoppingCart, LuBrain, LuPenTool, LuAward, LuZap, LuGem, LuUsers, LuSearch, LuRocket, LuLifeBuoy, LuTrendingUp, LuCheck, LuActivity } from 'react-icons/lu';
import type { IconType } from 'react-icons';

export interface Service {
  _id: string;
  id: String;
  slug: string;
  title: string;
  description: string;
  published: boolean;
  Icon: IconType;
  overview: string;
  heroImage: string;
  offerings: {
    title: string;
    description: string;
  }[];
  whyChooseUs: {
    title: string;
    description: string;
    Icon: IconType;
  }[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  process: {
    title: string;
    description: string;
    Icon: IconType;
  }[];
  impact: {
    title: string;
    metric: string;
    description: string;
    Icon: IconType;
  }[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
  };
  gallery: {
    src: string;
    alt: string;
    dataAiHint: string;
  }[];
  industries: string[];
}


