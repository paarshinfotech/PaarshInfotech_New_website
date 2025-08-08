"use client";

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: {
    role: "user" | "bot";
    text: string;
  };
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-xs rounded-2xl p-3 text-sm shadow-md",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-background text-foreground"
        )}
      >
        {message.text}
      </div>
    </div>
  );
}
