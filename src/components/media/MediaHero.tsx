export default function MediaHero() {
  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
      />
      <div className="container text-center max-w-4xl relative">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
          Inside Paarsh Infotech
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80">
          Explore the culture, moments, and memories that make our team special.
        </p>
      </div>
    </section>
  );
}
