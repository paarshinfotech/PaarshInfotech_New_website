import { socialWallPosts } from "@/lib/mediaData";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";

export default function SocialWall() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Catch Us on Social</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Stay connected and see what we're up to. Here's a glimpse of our latest updates.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialWallPosts.map((post) => (
            <Card key={post.id} className="flex flex-col bg-background">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src="https://placehold.co/40x40.png"
                  alt="Paarsh Infotech Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                  data-ai-hint="company logo"
                />
                <div>
                  <p className="font-bold text-primary">Paarsh Infotech</p>
                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p>{post.content}</p>
                {post.image && (
                   <div className="relative aspect-video rounded-lg overflow-hidden">
                     <Image
                      src={post.image}
                      alt="Social media post image"
                      fill
                      className="object-cover"
                      data-ai-hint={post.hint}
                     />
                   </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-around border-t pt-4 mt-4">
                 <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-sm">Like</span>
                 </div>
                 <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm">Comment</span>
                 </div>
                 <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">Share</span>
                 </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
