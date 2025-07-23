const ClientLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 128 48"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 32c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zM76 4h8v40h-8zM92 4h8v40h-8zM108 4h16v8h-8v32h-8V12h-8z"
      fill="currentColor"
    />
  </svg>
);

const clients = [
  { id: 1, name: "TechCorp", published: true },
  { id: 2, name: "HealthFirst", published: true },
  { id: 3, name: "Urban Apparel", published: true },
  { id: 4, name: "Innovate Corp", published: true },
  { id: 5, name: "Innovate Corp", published: true },
  { id: 6, name: "Innovate Corp", published: true },
  { id: 7, name: "Innovate Corp", published: true },
  { id: 8, name: "Innovate Corp", published: false },
  { id: 9, name: "Innovate Corp", published: true },
  { id: 10, name: "Innovate Corp", published: true },
];

export default function Clients() {
  const publishedClients = clients.filter((c) => c.published);
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Valued Clients
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            We are proud to have worked with a diverse range of businesses.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 items-center">
          {publishedClients.map((client) => (
            <div key={client.id} className="flex justify-center items-center">
              <ClientLogo className="w-32 h-12 text-muted-foreground/60 hover:text-foreground/80 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
