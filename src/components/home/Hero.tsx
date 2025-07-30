"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaStar, FaBriefcase } from "react-icons/fa";
import { WavyBackground } from "../ui/wavy-background";
import { TypewriterEffect } from "../ui/typewriter-effect";

export default function Hero() {
  const words = [
    { text: "Best", className: "text-white" },
    { text: "Software", className: "text-white" },
    { text: "Development", className: "text-white" },
    { text: "Company", className: "text-white" },
    { text: "in", className: "text-white" },
    { text: "Nashik.", className: "text-primary" },
  ];

  return (
    <WavyBackground
      className="max-w-4xl mx-auto py-20 md:py-32 lg:py-40"
      backgroundFill="black"
    >
      <div className="text-center">
        <TypewriterEffect words={words} />
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-8">
          We deliver high-quality, reliable, and scalable software solutions to
          help your business grow.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow"
          >
            <Link href="/quote">
              Get A Quote
              <FaArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-y-4 gap-x-8 text-sm text-white/70">
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
