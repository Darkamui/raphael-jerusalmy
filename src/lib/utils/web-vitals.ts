/**
 * Web Vitals tracking for Core Web Vitals optimization
 */

import type { CLSMetric, FCPMetric, LCPMetric, TTFBMetric, Metric } from 'web-vitals';

// Track Core Web Vitals metrics
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Dynamically import web-vitals to avoid SSR issues
  import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }).catch((error) => {
    console.warn('Web Vitals tracking failed:', error);
  });
}

type WebVitalMetric = CLSMetric | FCPMetric | LCPMetric | TTFBMetric | Metric;

function sendToAnalytics(metric: WebVitalMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Web Vital:', {
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
    
    // Example for custom endpoint:
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

// Helper to track custom performance metrics
export function trackCustomMetric(name: string, value: number, unit = 'ms') {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`Custom Metric: ${name}`, { value, unit });
  }
  
  // Send to performance API
  if ('performance' in window && 'mark' in window.performance) {
    performance.mark(`${name}:${value}${unit}`);
  }
}

// Track resource loading performance
export function trackResourceTiming() {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  // Track large resource loads
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resourceEntry = entry as PerformanceResourceTiming;
      if (resourceEntry.transferSize && resourceEntry.transferSize > 100000) { // Resources > 100KB
        trackCustomMetric(`large-resource-${entry.name.split('/').pop()}`, entry.duration);
      }
    }
  });

  observer.observe({ entryTypes: ['resource'] });
}

// Monitor layout shifts
export function trackLayoutShifts() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  let clsValue = 0;
  const clsEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Only count layout shifts without recent user input
      const layoutShiftEntry = entry as LayoutShiftEntry;
      if (!layoutShiftEntry.hadRecentInput) {
        clsValue += layoutShiftEntry.value;
        clsEntries.push(entry);
      }
    }
  });

  observer.observe({ entryTypes: ['layout-shift'] });

  // Report CLS when page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && clsValue > 0) {
      trackCustomMetric('cumulative-layout-shift', clsValue);
    }
  });
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}