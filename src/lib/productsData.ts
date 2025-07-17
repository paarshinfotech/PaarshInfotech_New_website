
import { Layers, Briefcase, Bot, GraduationCap, Zap, ShieldCheck, Scale, Users, LineChart, Code } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    published: boolean;
    Icon: LucideIcon;
    heroImage: string;
    gallery: { src: string; alt: string; hint: string; }[];
    features: { title: string; description: string; Icon: LucideIcon; }[];
}

export const productsData: Product[] = [
    {
        id: "crm",
        name: "Paarsh CRM",
        tagline: "Build Lasting Customer Relationships",
        description: "An all-in-one Customer Relationship Management platform designed to help you manage leads, close deals faster, and create exceptional customer experiences.",
        published: true,
        Icon: Users,
        heroImage: "https://placehold.co/1200x800.png",
        gallery: [
            { src: "https://placehold.co/800x600.png", alt: "CRM Dashboard", hint: "dashboard analytics" },
            { src: "https://placehold.co/800x600.png", alt: "Contact Management", hint: "contact list" },
            { src: "https://placehold.co/800x600.png", alt: "Sales Pipeline", hint: "sales pipeline" },
        ],
        features: [
            { title: "Lead Management", description: "Capture, track, and score leads from various channels.", Icon: Zap },
            { title: "Sales Automation", description: "Automate repetitive tasks to let your sales team focus on selling.", Icon: Bot },
            { title: "Advanced Analytics", description: "Get real-time insights into your sales performance.", Icon: LineChart },
        ]
    },
    {
        id: "hrms",
        name: "Paarsh HRMS",
        tagline: "Empower Your Workforce, Simplify HR",
        description: "A comprehensive Human Resource Management System that automates everything from recruitment and onboarding to payroll and performance management.",
        published: true,
        Icon: Briefcase,
        heroImage: "https://placehold.co/1200x800.png",
        gallery: [
            { src: "https://placehold.co/800x600.png", alt: "Employee Directory", hint: "employee profile" },
            { src: "https://placehold.co/800x600.png", alt: "Leave Management", hint: "calendar view" },
            { src: "https://placehold.co/800x600.png", alt: "Payroll Processing", hint: "payroll dashboard" },
        ],
        features: [
            { title: "Recruitment & Onboarding", description: "Streamline the entire hiring process from application to hire.", Icon: Users },
            { title: "Payroll Management", description: "Automate salary calculations, deductions, and compliance.", Icon: Zap },
            { title: "Performance Reviews", description: "Set goals, track progress, and conduct performance reviews.", Icon: LineChart },
        ]
    },
    {
        id: "erp",
        name: "Paarsh ERP",
        tagline: "Unify Your Business Operations",
        description: "An integrated Enterprise Resource Planning solution that brings together your finance, supply chain, manufacturing, and HR processes into a single, unified system.",
        published: true,
        Icon: Layers,
        heroImage: "https://placehold.co/1200x800.png",
        gallery: [
            { src: "https://placehold.co/800x600.png", alt: "Financial Dashboard", hint: "finance chart" },
            { src: "https://placehold.co/800x600.png", alt: "Inventory Tracking", hint: "warehouse stock" },
            { src: "https://placehold.co/800x600.png", alt: "Supply Chain Visualization", hint: "supply chain" },
        ],
        features: [
            { title: "Financial Management", description: "Automate accounting, invoicing, and financial reporting.", Icon: LineChart },
            { title: "Supply Chain", description: "Optimize inventory, procurement, and logistics.", Icon: Zap },
            { title: "Manufacturing Control", description: "Manage production orders, bills of materials, and shop floor control.", Icon: Code },
        ]
    },
    {
        id: "e-learn",
        name: "Paarsh E-Learn",
        tagline: "The Future of Digital Education",
        description: "A powerful Learning Management System (LMS) for educational institutions and corporate training, enabling you to create, manage, and deliver engaging online courses.",
        published: true,
        Icon: GraduationCap,
        heroImage: "https://placehold.co/1200x800.png",
        gallery: [
            { src: "https://placehold.co/800x600.png", alt: "Course Dashboard", hint: "online course" },
            { src: "https://placehold.co/800x600.png", alt: "Interactive Quiz", hint: "quiz interface" },
            { src: "https://placehold.co/800x600.png", alt: "Student Progress Tracking", hint: "progress chart" },
        ],
        features: [
            { title: "Course Builder", description: "Easily create rich, interactive courses with video, quizzes, and assignments.", Icon: Code },
            { title: "Live Classes", description: "Host virtual classrooms with video conferencing and whiteboarding.", Icon: Users },
            { title: "Analytics & Reporting", description: "Track student progress and course effectiveness.", Icon: LineChart },
        ]
    }
];

export const coreFeatures = [
    { title: "AI-Powered Insights", description: "Leverage artificial intelligence to get predictive analytics and smarter recommendations across all our products.", Icon: Bot },
    { title: "Enterprise-Grade Security", description: "Your data is protected with multi-layered security, encryption, and regular audits to ensure compliance.", Icon: ShieldCheck },
    { title: "Ultimate Scalability", description: "Our cloud-native architecture ensures our products grow with your business, from startup to enterprise.", Icon: Scale },
    { title: "Seamless Integrations", description: "Connect our products with the tools you already use, creating a unified and efficient workflow.", Icon: Zap },
];
