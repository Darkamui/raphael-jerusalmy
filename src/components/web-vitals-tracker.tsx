'use client';

import { useEffect } from 'react';
import { getPerformanceMonitor } from '@/lib/utils/performance-monitor';

interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export function WebVitalsTracker() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    const performanceMonitor = getPerformanceMonitor();

    // Track Web Vitals
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
      function sendToAnalytics(metric: Metric) {
        // Evaluate against performance budget first
        performanceMonitor.evaluateMetric(metric.name, metric.value);
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.warn('🔥 Web Vital:', {
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

      console.warn('✅ Web Vitals tracking initialized');
      
      // Monitor resource count after page load
      setTimeout(() => {
        performanceMonitor.checkResourceCount();
      }, 3000);
      
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