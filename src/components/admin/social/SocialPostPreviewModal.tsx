
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { SocialPost } from "@/app/(admin)/admin/social/page";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

interface SocialPostPreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post: SocialPost | null;
}

export function SocialPostPreviewModal({ isOpen, onOpenChange, post }: SocialPostPreviewModalProps) {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Post Preview</DialogTitle>
          <DialogDescription>
            This is how the post will appear on the media page.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
             <Card className="flex flex-col bg-background">
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
                   <ImagePreviewModal imgSrc={post.image} alt="Social media post image">
                    <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer">
                      <Image
                        src={post.image}
                        alt="Social media post image"
                        fill
                        className="object-cover"
                        data-ai-hint={post.hint}
                      />
                    </div>
                   </ImagePreviewModal>
                )}
              </CardContent>
              <CardFooter className="flex justify-around border-t pt-4 mt-4">
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-sm">{post.likes}</span>
                 </div>
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                 </div>
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">Share</span>
                 </div>
              </CardFooter>
            </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
