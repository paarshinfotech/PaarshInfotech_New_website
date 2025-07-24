"use client";

import { useRef, useEffect, useState, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function FadeInSection({ children }: PropsWithChildren) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing the element once it's visible
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={cn(
        'transition-opacity duration-1000 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'
      )}
    >
      {children}
    </div>
  );
}
