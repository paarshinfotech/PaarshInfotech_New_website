'use client';

import { useState, useRef } from "react";
import Image from "next/image";
import { FiPlayCircle, FiAlertCircle, FiExternalLink, FiMaximize2 } from "react-icons/fi";
import { VideoPlayerModal } from "@/components/common/VideoPlayerModal";

interface ProductDemoVideoProps {
  videoUrl?: string;
  videoThumbnail?: string;
}

export default function ProductDemoVideo({ videoUrl, videoThumbnail }: ProductDemoVideoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!videoUrl || !videoUrl.trim()) return null;

  const handleStartPlay = () => {
    setIsPlayingInline(true);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Inline play error:", err);
      });
    }
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">See It in Action</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto">
            Watch a quick overview of how our product can transform your workflow.
          </p>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-black group">
            {videoError ? (
              <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center text-white bg-zinc-900 space-y-4">
                <FiAlertCircle className="w-12 h-12 text-yellow-400" />
                <div>
                  <h4 className="text-lg font-semibold">Video format issue</h4>
                  <p className="text-sm text-gray-400 max-w-md mt-1">
                    Your browser could not decode this video file directly. Click below to view or download it.
                  </p>
                </div>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all text-sm"
                >
                  <FiExternalLink className="w-4 h-4" /> Open Video Directly
                </a>
              </div>
            ) : isPlayingInline || !videoThumbnail ? (
              <div className="relative w-full h-full bg-black">
                <video
                  ref={videoRef}
                  key={videoUrl}
                  controls
                  autoPlay={isPlayingInline}
                  playsInline
                  preload="auto"
                  poster={videoThumbnail || undefined}
                  className="w-full h-full object-contain"
                  onError={() => setVideoError(true)}
                >
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl} type="video/webm" />
                  <source src={videoUrl} type="video/quicktime" />
                  <source src={videoUrl} />
                  Your browser does not support the video tag.
                </video>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Open in theater mode"
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-lg backdrop-blur-sm transition-all z-20 opacity-0 group-hover:opacity-100"
                  title="Expand to Theater View"
                >
                  <FiMaximize2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div
                className="relative w-full h-full cursor-pointer bg-black"
                onClick={handleStartPlay}
              >
                <Image
                  src={videoThumbnail}
                  alt="Product Demo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/30">
                  <FiPlayCircle className="w-20 h-20 text-white/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white drop-shadow-lg" />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  aria-label="Open in theater mode"
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-lg backdrop-blur-sm transition-all z-20 opacity-0 group-hover:opacity-100"
                  title="Expand to Theater View"
                >
                  <FiMaximize2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <VideoPlayerModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        videoSrc={videoUrl}
      />
    </>
  );
}
