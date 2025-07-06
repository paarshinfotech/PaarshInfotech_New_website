"use client";

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 150, label: "Happy Clients" },
  { value: 200, label: "Projects Completed" },
  { value: 9000, label: "Hours of Support" },
  { value: 25, label: "Hard Workers" },
];

function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(1500 / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = (frame / totalFrames) ** 2; // easeOutQuad
      const currentCount = Math.round(end * progress);
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [end, frameRate, totalFrames]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-bold text-accent">
                {isVisible ? <CountUp end={stat.value} /> : '0'}+
              </p>
              <p className="mt-2 text-base md:text-lg font-medium text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
