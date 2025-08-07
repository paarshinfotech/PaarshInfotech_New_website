
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { LuQuote } from "react-icons/lu";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

export default function Testimonial() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-4xl">
        <Card className="p-8 shadow-lg bg-background">
          <CardContent className="text-center p-0">
            <LuQuote className="w-12 h-12 text-accent mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl italic text-foreground/80">
              "This product has been a complete game-changer for our team. We're more efficient, collaborative, and data-driven than ever before. I can't imagine working without it."
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <ImagePreviewModal imgSrc="https://placehold.co/100x100.png" alt="Kavita Patil">
                <Image src="https://placehold.co/100x100.png" alt="Kavita Patil" width={56} height={56} className="rounded-full object-cover cursor-pointer" data-ai-hint="person" />
              </ImagePreviewModal>
              <div>
                <p className="font-semibold text-primary text-lg">Kavita Patil</p>
                <p className="text-muted-foreground">Manager , MazeBox Inc.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
