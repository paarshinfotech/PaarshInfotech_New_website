
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LuMessageSquare, LuSend, LuX, LuLoader } from "react-icons/lu";
import { useSendMessageToChatbotMutation } from "@/services/api";
import { ChatBubble } from "./ChatBubble";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

type FormData = z.infer<typeof formSchema>;

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello! How can I help you today?",
    },
  ]);
  const [sendMessage, { isLoading }] = useSendMessageToChatbotMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const userMessage: Message = { role: "user", text: values.message };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    try {
      const response = await sendMessage({ message: values.message }).unwrap();
      const botMessage: Message = { role: "bot", text: response.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        role: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full h-16 w-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <LuX className="h-8 w-8" /> : <LuMessageSquare className="h-8 w-8" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </div>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Card className="w-96 h-[450px] flex flex-col shadow-2xl">
              <CardHeader className="p-4 border-b">
                <h3 className="font-bold text-lg text-primary">Chat with us</h3>
              </CardHeader>
              <CardContent className="p-4 flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <ChatBubble key={index} message={msg} />
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <LuLoader className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex w-full gap-2"
                >
                  <Input
                    {...form.register("message")}
                    placeholder="Ask a question..."
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <LuSend className="h-5 w-5" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
