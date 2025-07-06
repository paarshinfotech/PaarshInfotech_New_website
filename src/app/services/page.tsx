import WhyChooseUs from "@/components/home/WhyChooseUs";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";
import {
  CodeXml,
  ServerCog,
  Smartphone,
  Paintbrush,
  BrainCircuit,
  GanttChartSquare,
  TabletSmartphone,
  ShoppingCart,
  Network,
  Bot,
  Megaphone,
  PenTool,
  Palette,
  Users,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  Icon: LucideIcon;
  category: 'development' | 'design' | 'marketing' | 'intelligence';
  tech: string[];
};

const services: Service[] = [
  {
    title: "Web Development",
    description: "We build user-friendly, high-performance websites tailored to your business needs, ensuring a seamless experience across all devices.",
    Icon: CodeXml,
    category: 'development',
    tech: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Software Development",
    description: "Custom software solutions to streamline your operations, drive efficiency, and support your business's growth at scale.",
    Icon: ServerCog,
    category: 'development',
    tech: ["Python", "Django", "Docker", "PostgreSQL"],
  },
  {
    title: "Android App Development",
    description: "Engaging and intuitive Android applications that have completely transformed the way we do business today.",
    Icon: Smartphone,
    category: 'development',
    tech: ["Kotlin", "Java", "Firebase"],
  },
  {
    title: "iOS Development",
    description: "Sleek and powerful applications for Apple's iOS platform, designed to deliver an exceptional mobile experience.",
    Icon: TabletSmartphone,
    category: 'development',
    tech: ["Swift", "Xcode", "SwiftUI"],
  },
  {
    title: "E-Commerce Development",
    description: "Robust e-commerce solutions that enable you to sell products globally with secure payment integrations and scalable architecture.",
    Icon: ShoppingCart,
    category: 'development',
    tech: ["Shopify", "Magento", "WooCommerce"],
  },
  {
    title: "Strategy & Design",
    description: "Craft compelling strategies and innovative designs that align with your business goals, enhancing brand identity and user engagement.",
    Icon: Paintbrush,
    category: 'design',
    tech: ["Figma", "Adobe XD", "Miro"],
  },
  {
    title: "Logo Design",
    description: "Create a memorable and impactful brand identity with a unique logo crafted through a blend of creativity and design theory.",
    Icon: PenTool,
    category: 'design',
    tech: ["Adobe Illustrator", "Figma"],
  },
  {
    title: "Graphic Design",
    description: "Bring your vision to life with stunning digital artwork and graphics that build confidence and captivate your audience.",
    Icon: Palette,
    category: 'design',
    tech: ["Photoshop", "Illustrator", "Canva"],
  },
  {
    title: "Digital Marketing",
    description: "Utilize cutting-edge digital technologies to execute marketing campaigns that increase visibility, engagement, and conversions.",
    Icon: Megaphone,
    category: 'marketing',
    tech: ["Google Analytics", "SEMrush", "Ahrefs"],
  },
  {
    title: "Social Media Marketing",
    description: "Leverage social platforms to build a community, share your story, and connect with your audience in meaningful ways.",
    Icon: Users,
    category: 'marketing',
    tech: ["Hootsuite", "Buffer", "Sprout Social"],
  },
  {
    title: "Omnichannel Consulting",
    description: "Elevate your customer experience across all channels with tailored strategies that integrate digital and physical touchpoints seamlessly.",
    Icon: Network,
    category: 'marketing',
    tech: ["Salesforce", "HubSpot", "Zendesk"],
  },
  {
    title: "Analytics, AI & ML",
    description: "Transform data into actionable insights, predict trends, and drive intelligent business outcomes with our AI and machine learning expertise.",
    Icon: BrainCircuit,
    category: 'intelligence',
    tech: ["Python", "TensorFlow", "Pandas"],
  },
  {
    title: "Product Engineering",
    description: "Drive innovation with robust product engineering, from concept to deployment, ensuring top-notch quality and performance.",
    Icon: GanttChartSquare,
    category: 'intelligence',
    tech: ["Jira", "Git", "Jenkins"],
  },
  {
    title: "Workflow Automation",
    description: "Streamline your business processes with intelligent automation solutions, enhancing efficiency and reducing operational costs.",
    Icon: Bot,
    category: 'intelligence',
    tech: ["Zapier", "Make.com", "Power Automate"],
  },
];

const serviceCategories = [
    { id: "development", name: "Development" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "intelligence", name: "Intelligence" },
] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Our Services
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            Comprehensive digital solutions to build, launch, and grow your business.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <Tabs defaultValue="development" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-12">
              {serviceCategories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="py-2.5">{cat.name}</TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((cat) => (
                <TabsContent key={cat.id} value={cat.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.filter(s => s.category === cat.id).map((service) => (
                            <Card key={service.title} className="flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <CardHeader>
                                    <div className="mb-4">
                                        <service.Icon className="w-10 h-10 text-accent" />
                                    </div>
                                    <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{service.description}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex flex-wrap gap-2">
                                        {service.tech.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Success Stories</h2>
                <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">See how we've helped businesses like yours achieve their goals with our tailored solutions.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-primary">Global E-Commerce Platform Launch</h3>
                    <p className="text-muted-foreground">We partnered with a retail startup to build a scalable e-commerce platform from the ground up. The solution included a custom storefront, secure payment gateway integration, and an automated inventory management system, resulting in a 300% increase in sales within the first quarter.</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge>E-Commerce Development</Badge>
                        <Badge>Web Development</Badge>
                        <Badge>Strategy & Design</Badge>
                    </div>
                </div>
                <div className="w-full h-80 relative rounded-lg overflow-hidden group">
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="E-commerce project"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="online store"
                    />
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-primary mb-4">Have a project in mind?</h2>
          <p className="text-foreground/80 mb-8">
            Let's discuss how our expertise can help you achieve your goals. Get a free, no-obligation quote today.
          </p>
          <Button asChild size="lg">
            <Link href="/quote">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>

      <WhyChooseUs />
    </>
  );
}
