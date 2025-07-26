"use client";
import { useGetClientsQuery } from "@/services/api";

// Keep the ClientLogo as fallback (optional)
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

interface Client {
  _id: string;
  name: string;
  industry: string;
  since: string;
  logo: string;
  published: boolean;
  order: number;
}

export default function Clients() {
  const { data: clientData } = useGetClientsQuery(undefined);
  console.log("clientData", clientData);

  const clients: Client[] = clientData || [];
  const publishedClients = clients.filter((c: Client) => c.published);

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Our Valued Clients
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            We are proud to have worked with a diverse range of businesses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16 items-center">
          {publishedClients.map((client: Client) => (
            <div key={client._id} className="flex flex-col justify-center items-center space-y-4 p-6 rounded-xl hover:bg-muted/30 transition-all duration-300">
              <div className="flex justify-center items-center h-24 w-40 lg:h-28 lg:w-48">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                  onError={(e) => {
                    // Fallback to default logo if image fails to load
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <ClientLogo 
                  className="w-40 h-16 lg:w-48 lg:h-20 text-muted-foreground/60 hover:text-foreground/80 transition-colors hidden" 
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg lg:text-xl font-semibold text-foreground/90">{client.name}</h3>
                <p className="text-base lg:text-lg text-muted-foreground font-medium">{client.industry}</p>
                <p className="text-sm text-muted-foreground/70">Since {client.since}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}