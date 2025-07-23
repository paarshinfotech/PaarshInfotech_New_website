import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuMail, LuSend } from "react-icons/lu";

export default function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="relative bg-background text-foreground rounded-2xl shadow-lg p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-grid-pattern opacity-40 [mask-image:linear-gradient(to_top,white,transparent)]"></div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
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
              <form className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-14 pl-6 pr-36 rounded-full text-base border-2"
                  aria-label="Email for newsletter"
                />
                <Button
                  type="submit"
                  variant="default"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-full px-6"
                >
                  <LuSend className="w-4 h-4 mr-2" />
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
    </section>
  );
}
