
import { LuLayers, LuBriefcase, LuBot, LuGraduationCap, LuZap, LuShieldCheck, LuScale, LuUsers, LuActivity, LuCode } from 'react-icons/lu';
import type { IconType } from 'react-icons';

export interface Product {
    _id?: string;
    id: string;
    name: string;
    tagline: string;
    description: string;
    published: boolean;
    Icon: IconType;
    heroImage: string;
    gallery: { src: string; alt: string; hint: string; }[];
    features: { title: string; description: string; Icon: IconType; }[];
}


export const coreFeatures = [
    { title: "AI-Powered Insights", description: "Leverage artificial intelligence to get predictive analytics and smarter recommendations across all our products.", Icon: LuBot },
    { title: "Enterprise-Grade Security", description: "Your data is protected with multi-layered security, encryption, and regular audits to ensure compliance.", Icon: LuShieldCheck },
    { title: "Ultimate Scalability", description: "Our cloud-native architecture ensures our products grow with your business, from startup to enterprise.", Icon: LuScale },
    { title: "Seamless Integrations", description: "Connect our products with the tools you already use, creating a unified and efficient workflow.", Icon: LuZap },
];
