import { QuoteForm } from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Request a Quote
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            Tell us about your project, and we'll provide you with a customized quote and an AI-generated email to get you started.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
