"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuMail, LuSend, LuLoader } from "react-icons/lu";
import { useAddNewsletterSubscriberMutation } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [addSubscriber, { isLoading }] = useAddNewsletterSubscriberMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({ variant: "destructive", title: "Email Required", description: "Please enter your email address." });
      return;
    }

    try {
      await addSubscriber(email.trim()).unwrap();
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    } catch (error: any) {
      const message = error?.data?.error || "Something went wrong. Please try again.";
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: message,
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="relative rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden bg-primary/5">
          {/* Background Aurora */}
          <div
            className="absolute -inset-24 top-0 left-0 w-full h-full opacity-30 animate-aurora"
            style={{
              backgroundImage:
                "radial-gradient(at 21% 33%, hsl(var(--primary)) 0px, transparent 50%), radial-gradient(at 79% 30%, hsl(var(--accent)) 0px, transparent 50%), radial-gradient(at 33% 83%, hsl(var(--primary)) 0px, transparent 50%)",
            }}
          />

          {/* Glassmorphism Card */}
          <div className="relative z-10 bg-background/60 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:pr-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <LuMail className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary">
                    Stay Updated
                  </h2>
                </div>
                <p className="mt-4 text-lg text-muted-foreground">
                  Subscribe to our newsletter to get the latest tech news,
                  company updates, and exclusive insights delivered to your
                  inbox.
                </p>
              </div>
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <form onSubmit={handleSubmit} className="flex flex-col sm:relative sm:flex-row gap-4 sm:gap-0">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full h-14 pl-6 rounded-full text-base border-2 sm:pr-36"
                    aria-label="Email for newsletter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full sm:w-auto sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 h-10 rounded-full px-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LuLoader className="w-4 h-4 animate-spin" />
                    ) : (
                      <LuSend className="w-4 h-4 mr-2" />
                    )}
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-3 text-center lg:text-left">
                  We respect your privacy. No spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
