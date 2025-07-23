import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPaperPlane } from "react-icons/fa";

export default function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container">
        <div className="relative bg-background text-foreground rounded-xl shadow-lg p-8 md:p-12 lg:p-16 overflow-hidden">
            <div className="absolute -right-16 -bottom-16 text-primary/5">
                <FaPaperPlane size={256} className="transform rotate-[-30deg]" />
            </div>
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Stay Updated</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Subscribe to our newsletter to get the latest tech news, company updates, and exclusive insights delivered to your inbox.
                    </p>
                </div>
                <form className="flex w-full max-w-md mx-auto md:mx-0 md:ml-auto rounded-md shadow-sm">
                    <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="flex-1 rounded-r-none focus:z-10" 
                        aria-label="Email for newsletter"
                    />
                    <Button type="submit" variant="default" className="rounded-l-none">
                        Subscribe
                    </Button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
}
