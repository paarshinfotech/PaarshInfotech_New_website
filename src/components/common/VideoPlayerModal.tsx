"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiExternalLink } from "react-icons/fi";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  videoSrc: string;
}

export function VideoPlayerModal({
  isOpen,
  onOpenChange,
  videoSrc,
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [videoSrc, isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      video.play().catch((error) => {
        console.warn("Video autoplay prevented:", error);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-none shadow-2xl !rounded-lg overflow-hidden">
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {hasError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
              <FiAlertCircle className="w-12 h-12 text-yellow-400" />
              <div>
                <h4 className="text-lg font-semibold">Video preview format issue</h4>
                <p className="text-sm text-gray-400 max-w-md mt-1">
                  Your browser may not support inline playback for this video format (.mov / codec).
                </p>
              </div>
              <a
                href={videoSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all text-sm"
              >
                <FiExternalLink className="w-4 h-4" /> Open Video Directly
              </a>
            </div>
          ) : (
            <video
              ref={videoRef}
              key={videoSrc}
              width="100%"
              height="100%"
              controls
              playsInline
              preload="auto"
              className="w-full h-full object-contain"
              onError={() => setHasError(true)}
            >
              <source src={videoSrc} type="video/mp4" />
              <source src={videoSrc} type="video/webm" />
              <source src={videoSrc} type="video/quicktime" />
              <source src={videoSrc} />
              Your browser does not support the video tag.
            </video>
          )}

          <div className="absolute top-3 right-3 px-3 py-1 bg-black/40 backdrop-blur-sm rounded pointer-events-none z-10">
            <span className="text-white/70 text-sm font-semibold tracking-wider">
              paarshinfotech
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
