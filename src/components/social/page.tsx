
"use client";

import { useGetSocialPostsQuery } from "@/services/api";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { LuThumbsUp, LuMessageSquare } from "react-icons/lu";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

export default function SocialWall() {
  const { data: postsData = [], isLoading, error } = useGetSocialPostsQuery(undefined);
  const socialWallPosts = postsData.filter((p: any) => p.published);

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
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="flex flex-col bg-background animate-pulse">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        <div className="space-y-2">
                           <div className="h-4 w-32 bg-gray-200 rounded"></div>
                           <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                        <div className="aspect-video w-full rounded-lg bg-gray-200"></div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t pt-4 mt-auto">
                        <div className="h-6 w-20 bg-gray-200 rounded"></div>
                        <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    </CardFooter>
                </Card>
            ))
          ) : error ? (
            <p className="text-destructive col-span-full text-center">Failed to load social posts.</p>
          ) : (
            socialWallPosts.map((post: any) => (
              <Card key={post._id} className="flex flex-col bg-background">
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
                    <p className="text-sm text-muted-foreground">{new Date(post.timestamp).toLocaleDateString()}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="whitespace-pre-wrap">{post.content}</p>
                  {post.image && (
                     <ImagePreviewModal imgSrc={post.image} alt="Social media post image">
                      <div className="relative h-64 w-full rounded-lg overflow-hidden cursor-pointer bg-muted/30">
                        <Image
                          src={post.image}
                          alt="Social media post image"
                          fill
                          className="object-contain"
                          data-ai-hint={post.hint}
                        />
                      </div>
                     </ImagePreviewModal>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4 mt-auto">
                   <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      <LuThumbsUp className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.likes} Likes</span>
                   </div>
                   <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      <LuMessageSquare className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.comments} Comments</span>
                   </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
