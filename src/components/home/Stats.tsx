"use client";

import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaSmile, FaBriefcase, FaClock, FaUsers } from "react-icons/fa";
import {
  useGetMembersQuery,
  useGetProductsQuery,
  useGetClientsQuery,
} from "@/services/api";

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

  const {
    data: members = [],
    isLoading: membersLoading,
    error: membersError,
  } = useGetMembersQuery(undefined);

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery(undefined);

  const {
    data: clients = [],
    isLoading: clientsLoading,
    error: clientsError,
  } = useGetClientsQuery(undefined);

  // total team members
  const totalTeamMembers = members.length;
  const totalProducts = products?.data?.length;
  const totalClients = clients?.length;

  // Define stats array, using totalTeamMembers for "Hard Workers"
  const stats: { value: number; label: string; Icon: IconType }[] = [
    { value: 120, label: "Happy Clients", Icon: FaSmile },
    { value: 30, label: "Projects Completed", Icon: FaBriefcase },
    { value: 9000, label: "Hours of Support", Icon: FaClock },
    { value: 45, label: "Hard Workers", Icon: FaUsers },
  ];

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
    <section
      ref={ref}
      className="py-16 md:py-24 bg-primary text-primary-foreground"
    >
      <div className="container max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center md:divide-x divide-primary-foreground/20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center p-4">
              <stat.Icon className="w-10 h-10 mb-3 text-primary-foreground/70" />
              <p className="text-4xl md:text-5xl font-bold text-accent">
                {isVisible ? <CountUp end={stat.value} /> : "0"}+
              </p>
              <p className="mt-2 text-base font-medium text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
