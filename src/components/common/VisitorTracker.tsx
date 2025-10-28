'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Generate a unique session ID and store in localStorage
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  const storageKey = 'visitor_session_id';
  let sessionId = localStorage.getItem(storageKey);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(storageKey, sessionId);
  }
  
  return sessionId;
}

// Track visitor analytics
async function trackVisitor(data: {
  sessionId: string;
  page: string;
  referrer: string;
  timeSpent?: number;
}) {
  try {
    await fetch('/api/visitors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
}

export function VisitorTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const lastPageRef = useRef<string>('');

  useEffect(() => {
    // Don't track admin pages
    if (pathname?.startsWith('/admin')) {
      return;
    }

    const sessionId = getOrCreateSessionId();
    const referrer = typeof document !== 'undefined' ? document.referrer : 'direct';
    
    // Track page visit
    if (sessionId && pathname) {
      trackVisitor({
        sessionId,
        page: pathname,
        referrer,
      });
      
      // Update refs
      startTimeRef.current = Date.now();
      lastPageRef.current = pathname;
    }

    // Track time spent when leaving page
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      if (timeSpent > 0 && lastPageRef.current) {
        // Use sendBeacon for reliable tracking on page unload
        const data = JSON.stringify({
          sessionId,
          page: lastPageRef.current,
          referrer,
          timeSpent,
        });
        
        navigator.sendBeacon('/api/visitors', data);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Track time spent when component unmounts (route change)
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 0 && lastPageRef.current) {
        trackVisitor({
          sessionId,
          page: lastPageRef.current,
          referrer,
          timeSpent,
        });
      }
    };
  }, [pathname]);

  return null;
}
