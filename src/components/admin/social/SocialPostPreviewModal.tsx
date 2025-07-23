"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";
import { formatDistanceToNow } from "date-fns";

export interface SocialPost {
  _id: string;
  content: string;
  image: string | null;
  timestamp: string;
  likes: number;
  comments: number;
  hint: string;
  published: boolean;
}

interface SocialPostPreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post: SocialPost | null;
}

export function SocialPostPreviewModal({
  isOpen,
  onOpenChange,
  post,
}: SocialPostPreviewModalProps) {
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
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p>{post.content}</p>
              {post.image && (
                <ImagePreviewModal
                  imgSrc={post.image}
                  alt="Social media post image"
                >
                  <div className="relative h-96 w-full rounded-lg overflow-hidden cursor-pointer bg-muted/30">
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
            <CardFooter className="flex justify-start gap-8 border-t pt-4 mt-auto">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FaThumbsUp className="w-5 h-5" />
                <span className="text-sm">{post.likes} Likes</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FaComment className="w-5 h-5" />
                <span className="text-sm">{post.comments} Comments</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
