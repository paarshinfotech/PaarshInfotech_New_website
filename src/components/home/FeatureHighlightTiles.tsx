import { LuBriefcase, LuZap, LuUsers, LuHeartHandshake } from "react-icons/lu";
import type { IconType } from "react-icons";

const features: {
  title: string;
  description: string;
  Icon: IconType;
}[] = [
  {
    title: "Internship Opportunities",
    description:
      "Nurturing the next generation of tech leaders with hands-on experience and mentorship.",
    Icon: LuBriefcase,
  },
  {
    title: "Live Project Training",
    description:
      "Gain real-world skills by working on active client projects under expert guidance.",
    Icon: LuZap,
  },
  {
    title: "Client-Centric Approach",
    description:
      "Your success is our priority. We build lasting partnerships through collaboration and transparency.",
    Icon: LuUsers,
  },
  {
    title: "Employee-First Culture",
    description:
      "We invest in our team's growth and well-being, fostering an environment of innovation.",
    Icon: LuHeartHandshake,
  },
];

export default function FeatureHighlightTiles() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            More Than a Workplace
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We're building a community dedicated to growth, learning, and making
            a real impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="group relative rounded-xl border border-primary/10 bg-background/50 p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_var(--x,_0)_var(--y,_0),_hsl(var(--accent)/_0.2),_transparent_80%)]"></div>
              <div className="relative z-10 flex flex-col items-center h-full">
                <div className="p-4 bg-primary/10 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent">
                  <Icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-muted-foreground flex-grow">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelectorAll('.group.relative').forEach(card => {
              card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', x + 'px');
                card.style.setProperty('--y', y + 'px');
              });
            });
          `,
        }}
      />
    </section>
  );
}
