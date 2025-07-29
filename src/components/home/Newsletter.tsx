import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuMail, LuSend } from "react-icons/lu";

export default function Newsletter() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-primary to-accent">
          <div className="relative z-10 text-center text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-bold">
              Join Our Tech Insider
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Get the latest articles, tutorials, and updates from the Paarsh Infotech team delivered straight to your inbox.
            </p>
            <form className="mt-10 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-14 pl-6 rounded-full text-base bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-2 border-transparent focus:border-primary-foreground focus:bg-transparent"
                  aria-label="Email for newsletter"
                />
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="h-14 rounded-full px-10 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <LuSend className="w-5 h-5 mr-2" />
                  Subscribe
                </Button>
              </div>
            </form>
            <p className="text-xs text-primary-foreground/60 mt-4">
              We value your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
