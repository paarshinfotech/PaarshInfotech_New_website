'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { VideoPlayerModal } from "@/components/common/VideoPlayerModal";
import { FaPlayCircle } from "react-icons/fa";
import { FiAlertCircle, FiExternalLink, FiMaximize2, FiVideoOff } from "react-icons/fi";
import { useGetProductsQuery } from "@/services/api";
import { Product } from "@/lib/productsData";

interface ProductVideoDemoProps {
  selectedProduct?: Product | null;
}

export default function ProductVideoDemo({ selectedProduct }: ProductVideoDemoProps = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>("");
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  const { data: productsData, isLoading } = useGetProductsQuery(undefined);

  // Fallback to first published product if not controlled
  const publishedProducts: Product[] = (productsData?.data || []).filter(
    (p: Product) => Boolean(p.published)
  );

  const currentProduct = selectedProduct !== undefined && selectedProduct !== null
    ? selectedProduct
    : publishedProducts[0] || null;

  // Reset playback and error state when current product changes
  useEffect(() => {
    setIsPlayingInline(false);
    setVideoError(false);
  }, [currentProduct?._id]);

  if (isLoading || !currentProduct) {
    return null;
  }

  const hasVideo = Boolean(currentProduct.videoUrl && currentProduct.videoUrl.trim());
  const videoUrl = currentProduct.videoUrl || "";

  const handleStartPlay = () => {
    setIsPlayingInline(true);
    setVideoError(false);
    if (inlineVideoRef.current) {
      inlineVideoRef.current.play().catch((err) => {
        console.warn("Inline play error:", err);
      });
    }
  };

  const handleOpenModal = () => {
    if (videoUrl) {
      setActiveVideoUrl(videoUrl);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            See Our Products in Action
          </h2>
          <p className="text-lg text-foreground/70 mb-10 max-w-3xl mx-auto">
            Watch a quick overview of how our integrated suite can transform your business operations.
          </p>

          {/* Video Showcase: Displays video for the product selected in Flagship Products, or empty state */}
          {hasVideo ? (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-black group">
              {videoError ? (
                // Codec / Decode Fallback
                <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center text-white bg-zinc-900 space-y-4">
                  <FiAlertCircle className="w-12 h-12 text-yellow-400" />
                  <div>
                    <h4 className="text-lg font-semibold">Video format issue</h4>
                    <p className="text-sm text-gray-400 max-w-md mt-1">
                      Your browser could not decode this video file directly. Click below to view or download it.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all text-sm"
                    >
                      <FiExternalLink className="w-4 h-4" /> Open Video Directly
                    </a>
                  </div>
                </div>
              ) : isPlayingInline || !currentProduct.videoThumbnail ? (
                // Direct HTML5 Video Player
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={inlineVideoRef}
                    key={videoUrl}
                    controls
                    autoPlay={isPlayingInline}
                    playsInline
                    preload="auto"
                    poster={currentProduct.videoThumbnail || undefined}
                    className="w-full h-full object-contain"
                    onError={() => setVideoError(true)}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    <source src={videoUrl} type="video/webm" />
                    <source src={videoUrl} type="video/quicktime" />
                    <source src={videoUrl} />
                    Your browser does not support the video tag.
                  </video>

                  {/* Theater mode button */}
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    aria-label="Open in theater mode"
                    className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-lg backdrop-blur-sm transition-all z-20 opacity-0 group-hover:opacity-100"
                    title="Expand to Theater View"
                  >
                    <FiMaximize2 className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                // Custom Thumbnail Cover with Play Button
                <div
                  className="relative w-full h-full cursor-pointer bg-black"
                  onClick={handleStartPlay}
                >
                  <Image
                    src={currentProduct.videoThumbnail}
                    alt={`${currentProduct.name} Demo`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/30">
                    <FaPlayCircle className="w-20 h-20 text-white/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white drop-shadow-lg" />
                  </div>
                  {currentProduct.tagline && (
                    <div className="absolute bottom-0 left-0 p-6 text-left pointer-events-none">
                      <p className="text-xl md:text-2xl font-semibold text-white italic drop-shadow-lg">
                        &quot;{currentProduct.tagline}&quot;
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal();
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
          ) : (
            // Empty State: When the selected product does NOT have a video uploaded
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                <FiVideoOff className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No demo video available
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                A video demonstration has not been uploaded for this product yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <VideoPlayerModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        videoSrc={activeVideoUrl}
      />
    </>
  );
}
