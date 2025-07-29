
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
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Why Partner with Paarsh
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We combine expertise, passion, and a commitment to excellence to deliver exceptional results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-primary/10 bg-background/80 p-8 text-center shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 backdrop-blur-sm"
            >
              <div className="relative z-10 flex flex-col items-center h-full">
                <div className="p-5 bg-primary/10 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                  <Icon className="w-10 h-10 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
                <p className="text-foreground/60 flex-grow">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
