import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
           <div>
             <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Subscribe to our newsletter to get the latest tech news, company updates, and exclusive insights delivered to your inbox.
              </p>
           </div>
            <form className="flex w-full max-w-md mx-auto md:mx-0 md:ml-auto gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-primary-foreground text-primary placeholder:text-muted-foreground flex-1" 
                aria-label="Email for newsletter"
              />
              <Button type="submit" variant="secondary" size="icon" aria-label="Subscribe">
                <Send className="w-5 h-5" />
              </Button>
            </form>
        </div>
      </div>
    </section>
  );
}
