
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

export default function ProductDemoVideo() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">See It in Action</h2>
        <p className="text-lg text-foreground/70 mb-12 max-w-3xl mx-auto">
          Watch a quick overview of how our product can transform your workflow.
        </p>
        <ImagePreviewModal imgSrc="https://placehold.co/1280x720.png" alt="Product Demo">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl shadow-primary/20 group cursor-pointer">
            <Image
                src="https://placehold.co/1280x720.png"
                alt="Product Demo"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="software demo"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircle className="w-20 h-20 text-white/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
            </div>
            </div>
        </ImagePreviewModal>
      </div>
    </section>
  );
}
