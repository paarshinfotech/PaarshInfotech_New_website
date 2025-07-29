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
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We're honored to collaborate with innovative companies and startups to create impactful digital products.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary/50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary/50 to-transparent z-10" />
          <div className="w-full overflow-hidden">
            <div className="flex animate-marquee-slow hover:pause">
              {[...publishedClients, ...publishedClients].map((client: Client, index: number) => (
                <div key={`${client._id}-${index}`} className="flex-shrink-0 w-64 mx-8">
                  <div className="flex justify-center items-center h-32 p-4 bg-background rounded-2xl shadow-sm">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-h-16 w-auto object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}