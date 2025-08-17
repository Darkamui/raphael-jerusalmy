'use client';

import { useEffect } from 'react';

export function WebVitalsTracker() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    // Track Web Vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
      function sendToAnalytics(metric: any) {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('🔥 Web Vital:', {
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
          });
        }

        // Send to analytics service in production
        if (process.env.NODE_ENV === 'production') {
          // You can integrate with Google Analytics, PostHog, or other analytics services
          // Example for Google Analytics 4:
          if (window.gtag) {
            window.gtag('event', metric.name, {
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              event_category: 'Web Vitals',
              event_label: metric.id,
              non_interaction: true,
            });
          }
          
          // You can also send to a custom endpoint
          // fetch('/api/analytics/web-vitals', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     name: metric.name,
          //     value: metric.value,
          //     rating: metric.rating,
          //     url: window.location.href,
          //     userAgent: navigator.userAgent,
          //   }),
          // }).catch(console.error);
        }
      }

      onCLS(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);

      console.log('✅ Web Vitals tracking initialized');
    }).catch((error) => {
      console.warn('Web Vitals tracking failed:', error);
    });
  }, []);

  return null; // This component doesn't render anything
}

// Global type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}