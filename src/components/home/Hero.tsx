
'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaStar, FaBriefcase } from "react-icons/fa";
import { WavyBackground } from '../ui/wavy-background';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

export default function Hero() {
  
  const words = [
    { text: "Best" },
    { text: "Software" },
    { text: "Development" },
    { text: "Company" },
    { text: "in" },
    { text: "Nashik.", className: "text-primary" },
  ];
  
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
        <div className="text-center md:text-left">
          <TypewriterEffectSmooth words={words} />
          <p className="max-w-2xl mx-auto md:mx-0 text-lg md:text-xl text-foreground/80 mb-8 text-center">
            We deliver high-quality, reliable, and scalable software solutions to help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
           <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
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
    </WavyBackground>
  );
}
