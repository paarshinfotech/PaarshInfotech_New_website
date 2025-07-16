
const TechLogo = ({ name }: { name: string }) => (
    <div className="flex items-center justify-center h-20 w-20 bg-background rounded-full shadow-md border border-border/50">
        <span className="text-sm font-bold text-muted-foreground">{name}</span>
    </div>
);

export default function IntegrationShowcase() {
  const logos = ["Slack", "Google", "HubSpot", "Zapier", "Jira", "Zendesk", "Mailchimp", "Trello", "Asana", "Salesforce"];
  
  // Duplicate for seamless scroll
  const extendedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Works With Your Favorite Tools</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Our products seamlessly integrate with the ecosystem of apps your team already loves, creating a unified workflow.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee-slow group-hover:[animation-play-state:paused]">
            {extendedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <TechLogo name={logo} />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-secondary via-transparent to-secondary"></div>
        </div>
      </div>
    </section>
  );
}
