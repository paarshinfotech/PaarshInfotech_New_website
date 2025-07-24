
import { LuAward, LuZap, LuGem, LuUsers } from "react-icons/lu";
import { IconType } from "react-icons";

const features: { title: string; description: string; Icon: IconType }[] = [
  {
    title: "Complete Technology Partner",
    description:
      "We provide end-to-end solutions, from concept to deployment and beyond, ensuring your project's success.",
    Icon: LuGem,
  },
  {
    title: "100% Customer References",
    description:
      "Our track record speaks for itself. We proudly maintain excellent relationships and satisfaction with all our clients.",
    Icon: LuAward,
  },
  {
    title: "Fast, Scalable, and Reliable",
    description:
      "We build robust applications that perform under pressure and scale with your business needs.",
    Icon: LuZap,
  },
  {
    title: "The Emerging Tech Experts",
    description:
      "Stay ahead of the curve with our expertise in AI, ML, and other cutting-edge technologies.",
    Icon: LuUsers,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We are more than just a software company. We are your partners in
            innovation, committed to delivering excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="group relative rounded-md border border-primary/10 bg-background p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_var(--x,_0)_var(--y,_0),_hsl(var(--primary)/_0.2),_transparent_80%)]"></div>
              <div className="relative z-10 flex flex-col items-center h-full">
                <div className="p-4 bg-primary/10 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                  <Icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
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
