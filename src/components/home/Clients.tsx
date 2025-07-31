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

        {/* Infinite Carousel Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {publishedClients.map((client: Client) => (
              <div
                key={`first-${client._id}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <div className="h-20 w-32 lg:h-24 lg:w-40 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain filter  transition-all duration-300 hover:scale-110"
                    onError={(e) => {
                      // Fallback to default logo if image fails to load
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <ClientLogo
                    className="w-32 h-16 lg:w-40 lg:h-20 text-muted-foreground/60 hover:text-foreground/80 transition-colors hidden"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {publishedClients.map((client: Client) => (
              <div
                key={`second-${client._id}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <div className="h-20 w-32 lg:h-24 lg:w-40 flex items-center justify-center">
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
                    className="w-32 h-16 lg:w-40 lg:h-20 text-muted-foreground/60 hover:text-foreground/80 transition-colors hidden"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}