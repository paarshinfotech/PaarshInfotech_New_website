"use client";

import { useEffect, useRef, useState } from 'react';
import { Percent, Clock, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const stats: { value: number; label: string; Icon: LucideIcon, suffix: string }[] = [
  { value: 45, label: "Increase in Productivity", Icon: Zap, suffix: "%" },
  { value: 8, label: "Hours Saved Per Week", Icon: Clock, suffix: "hrs" },
  { value: 99, label: "Customer Satisfaction", Icon: Percent, suffix: "%" },
];

function CountUp({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration * 1000 / frameRate);

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

export default function StatsHighlight() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 text-center md:divide-x divide-primary-foreground/20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center p-4">
              <stat.Icon className="w-10 h-10 mb-3 text-primary-foreground/70" />
              <p className="text-4xl md:text-5xl font-bold text-accent">
                {isVisible ? <CountUp end={stat.value} /> : '0'}{stat.suffix}
              </p>
              <p className="mt-2 text-base font-medium text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
