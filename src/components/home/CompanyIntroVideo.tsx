
"use client";

import { useState } from "react";
import Image from "next/image";
// import { PlayCircle } from "lucide-react";
import { FaPlayCircle } from "react-icons/fa";
import { VideoPlayerModal } from "@/components/common/VideoPlayerModal";

export default function CompanyIntroVideo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In a real app, this would come from a CMS or props
  const videoSrc = "/uploads/Innovoatorsvideo.mp4"; // Placeholder video

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Meet the Innovators
          </h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-3xl mx-auto">
            A glimpse into our world, where ideas come to life and technology
            meets passion.
          </p>
          <div
            className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-primary/20 group cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src="/images/home-page-video-thumbnail.jpg" // 
              alt="Company Introduction Video"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="office presentation"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <FaPlayCircle className="w-20 h-20 text-white/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
            </div>
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-xl md:text-2xl font-semibold text-white italic drop-shadow-lg">
                "Building tomorrow's technology, today."
              </p>
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
