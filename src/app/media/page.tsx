import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const mediaItems = [
  {
    title: "Paarsh Infotech wins 'Best Startup Award 2023'",
    date: "October 26, 2023",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "award ceremony"
  },
  {
    title: "How AI is Revolutionizing the Software Industry",
    date: "September 15, 2023",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "artificial intelligence"
  },
  {
    title: "Our Guide to Scalable Web Architectures",
    date: "August 02, 2023",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "web architecture"
  },
];

export default function MediaPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Media & News
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            Read our latest articles, announcements, and press releases.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaItems.map((item) => (
              <Link href="#" key={item.title}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                     <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
