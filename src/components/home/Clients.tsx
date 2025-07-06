const ClientLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 128 48" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 32c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zM76 4h8v40h-8zM92 4h8v40h-8zM108 4h16v8h-8v32h-8V12h-8z" fill="currentColor" />
    </svg>
);


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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex justify-center items-center">
              <ClientLogo className="w-32 h-12 text-muted-foreground/60 hover:text-foreground/80 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
