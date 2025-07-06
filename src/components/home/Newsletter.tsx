import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Stay Updated</h2>
          <p className="mt-4 text-lg text-foreground/70 mb-8">
            Subscribe to our newsletter to get the latest news and updates.
          </p>
          <form className="flex max-w-md mx-auto gap-2">
            <Input type="email" placeholder="Enter your email" className="bg-background" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
