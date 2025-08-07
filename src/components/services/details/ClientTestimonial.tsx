import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { LuQuote } from "react-icons/lu";

import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

interface ClientTestimonialProps {
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatarBase64: string;
  };
}

export default function ClientTestimonial({ testimonial }: ClientTestimonialProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-4xl">
        <Card className="p-8 shadow-lg bg-background">
          <CardContent className="text-center p-0">
            <LuQuote className="w-12 h-12 text-accent mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl italic text-foreground/80">
              "{testimonial.quote}"
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <ImagePreviewModal imgSrc={testimonial.avatarBase64} alt={testimonial.name}>
                <Image src={testimonial.avatarBase64} alt={testimonial.name} width={56} height={56} className="rounded-full object-cover cursor-pointer" data-ai-hint="person" />
              </ImagePreviewModal>
              <div>
                <p className="font-semibold text-primary text-lg">{testimonial.name}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
