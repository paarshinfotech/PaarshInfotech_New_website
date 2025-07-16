
'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  videoSrc: string;
}

export function VideoPlayerModal({ isOpen, onOpenChange, videoSrc }: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      video.play().catch(error => {
        // Autoplay was prevented. This is common in browsers.
        // The user will have to click play manually on the controls.
        console.warn("Video autoplay prevented:", error);
      });
    } else {
      video.pause();
      video.currentTime = 0; // Reset video to the beginning when modal closes
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-none shadow-2xl !rounded-lg overflow-hidden">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={videoSrc}
            width="100%"
            height="100%"
            controls
            preload="auto"
            className="w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}
