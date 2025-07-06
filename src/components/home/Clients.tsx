export default function Clients() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Valued Clients</h2>
          <p className="mt-4 text-lg text-foreground/70">
            We are proud to have worked with a diverse range of businesses.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex justify-center items-center h-20 bg-secondary rounded-lg p-4">
              <div className="w-24 h-8 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
