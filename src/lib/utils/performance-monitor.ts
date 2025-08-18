/**
 * Performance monitoring utilities and budget enforcement
 */

export interface PerformanceBudget {
  // Bundle size limits (in bytes)
  maxBundleSize: number;
  maxChunkSize: number;
  
  // Core Web Vitals thresholds
  lcp: { good: number; needsImprovement: number }; // Largest Contentful Paint (ms)
  cls: { good: number; needsImprovement: number }; // Cumulative Layout Shift
  fcp: { good: number; needsImprovement: number }; // First Contentful Paint (ms)
  ttfb: { good: number; needsImprovement: number }; // Time to First Byte (ms)
  
  // Additional metrics
  resourceCount: number; // Maximum number of resources
  imageCount: number; // Maximum number of images
}

export const DEFAULT_PERFORMANCE_BUDGET: PerformanceBudget = {
  // Bundle size limits
  maxBundleSize: 400 * 1024, // 400KB
  maxChunkSize: 150 * 1024,  // 150KB
  
  // Core Web Vitals (Google recommended thresholds)
  lcp: { good: 2500, needsImprovement: 4000 }, // ms
  cls: { good: 0.1, needsImprovement: 0.25 },  // score
  fcp: { good: 1800, needsImprovement: 3000 }, // ms
  ttfb: { good: 800, needsImprovement: 1800 }, // ms
  
  // Resource limits
  resourceCount: 50,
  imageCount: 15,
};

export interface PerformanceMetric {
  name: string;
  value: number;
  threshold: number;
  status: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

export class PerformanceMonitor {
  private budget: PerformanceBudget;
  private metrics: PerformanceMetric[] = [];

  constructor(budget: PerformanceBudget = DEFAULT_PERFORMANCE_BUDGET) {
    this.budget = budget;
  }

  /**
   * Evaluate Core Web Vital metric against budget
   */
  evaluateMetric(name: string, value: number): PerformanceMetric {
    let threshold: number;
    let status: 'good' | 'needs-improvement' | 'poor';

    switch (name) {
      case 'LCP':
        threshold = this.budget.lcp.good;
        status = value <= this.budget.lcp.good ? 'good' : 
                value <= this.budget.lcp.needsImprovement ? 'needs-improvement' : 'poor';
        break;
      case 'CLS':
        threshold = this.budget.cls.good;
        status = value <= this.budget.cls.good ? 'good' : 
                value <= this.budget.cls.needsImprovement ? 'needs-improvement' : 'poor';
        break;
      case 'FCP':
        threshold = this.budget.fcp.good;
        status = value <= this.budget.fcp.good ? 'good' : 
                value <= this.budget.fcp.needsImprovement ? 'needs-improvement' : 'poor';
        break;
      case 'TTFB':
        threshold = this.budget.ttfb.good;
        status = value <= this.budget.ttfb.good ? 'good' : 
                value <= this.budget.ttfb.needsImprovement ? 'needs-improvement' : 'poor';
        break;
      default:
        threshold = 0;
        status = 'good';
    }

    const metric: PerformanceMetric = {
      name,
      value,
      threshold,
      status,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);
    this.reportMetric(metric);
    
    return metric;
  }

  /**
   * Check if bundle size is within budget
   */
  checkBundleSize(bundleSize: number, chunkSizes: number[] = []): boolean {
    const bundleWithinLimit = bundleSize <= this.budget.maxBundleSize;
    const chunksWithinLimit = chunkSizes.every(size => size <= this.budget.maxChunkSize);
    
    if (!bundleWithinLimit) {
      console.warn(`Bundle size ${(bundleSize / 1024).toFixed(1)}KB exceeds budget ${(this.budget.maxBundleSize / 1024).toFixed(1)}KB`);
    }
    
    if (!chunksWithinLimit) {
      const oversizedChunks = chunkSizes.filter(size => size > this.budget.maxChunkSize);
      console.warn(`${oversizedChunks.length} chunks exceed size budget of ${(this.budget.maxChunkSize / 1024).toFixed(1)}KB`);
    }
    
    return bundleWithinLimit && chunksWithinLimit;
  }

  /**
   * Monitor resource count
   */
  checkResourceCount(): void {
    if (typeof window === 'undefined') return;

    const resources = performance.getEntriesByType('resource');
    const images = resources.filter(resource => 
      resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
    );

    if (resources.length > this.budget.resourceCount) {
      console.warn(`Resource count ${resources.length} exceeds budget ${this.budget.resourceCount}`);
    }

    if (images.length > this.budget.imageCount) {
      console.warn(`Image count ${images.length} exceeds budget ${this.budget.imageCount}`);
    }
  }

  /**
   * Report metric to monitoring service
   */
  private reportMetric(metric: PerformanceMetric): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const emoji = metric.status === 'good' ? '✅' : metric.status === 'needs-improvement' ? '⚠️' : '❌';
      console.warn(`${emoji} Performance: ${metric.name} = ${metric.value} (${metric.status})`);
    }

    // In production, you could send to monitoring service
    if (process.env.NODE_ENV === 'production' && metric.status !== 'good') {
      // Example: Send to your monitoring service
      // this.sendToMonitoring(metric);
    }
  }

  /**
   * Get performance summary
   */
  getSummary(): {
    metrics: PerformanceMetric[];
    passedBudget: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    let passedBudget = true;

    // Check if any metrics failed
    this.metrics.forEach(metric => {
      if (metric.status === 'poor') {
        issues.push(`${metric.name}: ${metric.value} exceeds threshold ${metric.threshold}`);
        passedBudget = false;
      }
    });

    return {
      metrics: this.metrics,
      passedBudget,
      issues,
    };
  }

  /**
   * Clear stored metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * Update performance budget
   */
  updateBudget(newBudget: Partial<PerformanceBudget>): void {
    this.budget = { ...this.budget, ...newBudget };
  }
}

// Singleton instance
let performanceMonitorInstance: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitorInstance) {
    performanceMonitorInstance = new PerformanceMonitor();
  }
  return performanceMonitorInstance;
}