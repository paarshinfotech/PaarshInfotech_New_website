const TechLogo = ({ name }: { name: string }) => (
    <div className="flex items-center justify-center h-20 w-32 bg-background rounded-lg shadow-md border border-border/50">
        <span className="text-sm font-bold text-muted-foreground">{name}</span>
    </div>
);

export default function IntegrationLogos() {
  const logos = ["Slack", "Google", "HubSpot", "Zapier", "Jira", "Zendesk", "Mailchimp", "Trello"];
  const extendedLogos = [...logos, ...logos];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Integrates With Your Ecosystem</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Our product works seamlessly with the tools your team already relies on every day.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee-slow group-hover:[animation-play-state:paused]">
            {extendedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-4">
                <TechLogo name={logo} />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background"></div>
        </div>
      </div>
    </section>
  );
}
