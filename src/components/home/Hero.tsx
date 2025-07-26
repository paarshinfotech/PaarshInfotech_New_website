
'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { FaArrowRight, FaStar, FaBriefcase } from "react-icons/fa";
import { useGetSiteImagesQuery } from '@/services/api';

export default function Hero() {

  const { data: images = [], isLoading } = useGetSiteImagesQuery(undefined);
  
  const heroImage = images.find((img: any) => img.section === 'home_hero')?.imageUrl || "https://placehold.co/600x400.png";
  const heroImageHint = images.find((img: any) => img.section === 'home_hero')?.hint || "technology abstract";
  
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      {/* Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute -bottom-8 -right-20 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-6000"></div>
      
      <div className="container relative z-10 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center md:text-left">
            {/* <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary font-semibold">
              <FaStar className="w-4 h-4 mr-2" />
              Welcome to Paarsh Infotech
            </Badge> */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary mb-6">
              Best Software Development Company in Nashik
            </h1>
            <p className="max-w-2xl mx-auto md:mx-0 text-lg md:text-xl text-foreground/80 mb-8">
              We deliver high-quality, reliable, and scalable software solutions to help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
              <Button asChild size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow">
                <Link href="/quote">
                  Get A Quote
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
             <div className="flex justify-center md:justify-start space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <FaBriefcase className="w-4 h-4 text-primary" />
                    <span className="font-medium">200+ Projects Completed</span>
                </div>
                 <div className="flex items-center gap-2">
                    <FaStar className="w-4 h-4 text-primary" />
                    <span className="font-medium">150+ Happy Clients</span>
                </div>
            </div>
          </div>
          <div className="relative h-96 w-full rounded-lg group hidden md:block">
            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            <Image
              src={heroImage}
              alt="Innovative Software Solutions"
              fill
              className="relative object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={heroImageHint}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
