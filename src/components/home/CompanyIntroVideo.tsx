
"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlayCircle, FaRegPlayCircle } from "react-icons/fa";
import { VideoPlayerModal } from "@/components/common/VideoPlayerModal";
import { Button } from "@/components/ui/button";

export default function CompanyIntroVideo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In a real app, this would come from a CMS or props
  const videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4"; // Placeholder video

  return (
    <>
      <section className="py-20 md:py-32 bg-background">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 group cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <Image
                src="https://placehold.co/1280x720.png"
                alt="Company Introduction Video Thumbnail"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="team working in modern office"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                <FaRegPlayCircle className="w-24 h-24 text-white/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Discover Our Culture
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Take a look behind the scenes at Paarsh Infotech. See how our team collaborates, innovates, and brings ideas to life in a dynamic and supportive environment.
              </p>
              <Button onClick={() => setIsModalOpen(true)} size="lg" className="rounded-full px-8 py-6 text-base font-semibold">
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      <VideoPlayerModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        videoSrc={videoSrc}
      />
    </>
  );
}
